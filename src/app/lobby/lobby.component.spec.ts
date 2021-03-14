import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { WSService } from "app/services/ws.service";
import { PipesModule } from "app/shared/pipes/pipes.module";
import { MockComponent } from "ng-mocks";

import { LobbyComponent } from "./lobby.component";
import { FighterCardComponent } from "./fighter-card/fighter-card.component";
import { Fighter } from "app/interfaces/fight.interface";
import { of } from "rxjs";
import { Character } from "app/interfaces/character.interface";

jest.useFakeTimers();
describe("LobbyComponent", () => {
  let component: LobbyComponent;
  let fixture: ComponentFixture<LobbyComponent>;

  let activatedRoute: ActivatedRoute;
  let wSService: WSService;
  let router: Router;

  const userSaved = {
    _id: "1",
    name: "john",
    characters: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipesModule],
      declarations: [LobbyComponent, MockComponent(FighterCardComponent)],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: jest.fn(),
            navigateByUrl: jest.fn(),
          },
        },
        {
          provide: WSService,
          useValue: {
            connected: () => of(false),
            disconnected: () => of(false),
            searchingOpponent: () => of(false),
            opponentFound: () => of(false),
            turnResults: () => of(false),
            end: () => of(false),
            searchOpponent: () => of(false),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            data: {
              pipe: jest.fn(),
              subscribe: (fn: (value: Data) => void) => jest.fn(),
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    wSService = TestBed.inject(WSService);
    router = TestBed.inject(Router);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit()", () => {
    it("should set user and fighter", () => {
      component.isLoading = false;
      const fighterInfos = {
        user: userSaved,
        fighter: { ownerName: "" } as Character,
      } as Fighter;
      const spySubs = spyOn((component as any).subscriptions, "add");
      const spyInitDemands = spyOn(component as any, "initDemands");
      const spyWSService = spyOn(wSService, "connected").and.returnValue(
        of(true)
      );
      spyOn(activatedRoute.data, "pipe").and.returnValue(of({ fighterInfos }));
      component.ngOnInit();
      expect(spySubs).toHaveBeenCalled();
      expect(spyWSService).toHaveBeenCalled();
      expect(spyInitDemands).toHaveBeenCalled();
      expect(component.user).toEqual(fighterInfos.user);
      expect(component.fighter).toEqual(fighterInfos.fighter);
      expect(component.fighter.ownerName).toEqual(fighterInfos.user.name);
      expect(component.isLoading).toEqual(true);
    });
  });

  describe("iniDisconnectEvent()", () => {
    it("should subscribe disconnected wsService event", () => {
      const spySubs = spyOn((component as any).subscriptions, "add");
      const spyWSService = spyOn(wSService, "disconnected").and.returnValue(
        of(false)
      );
      const spy = spyOn(router, "navigateByUrl");
      (component as any).iniDisconnectEvent();
      expect(spySubs).toHaveBeenCalled();
      expect(spyWSService).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith("/dashboard/characters");
    });
  });

  describe("initSearchingOpponentEvent()", () => {
    it("should subscribe searchingOpponent wsService event", () => {
      component.isLoading = false;
      const spySubs = spyOn((component as any).subscriptions, "add");
      const spyWSService = spyOn(
        wSService,
        "searchingOpponent"
      ).and.returnValue(of(false));
      (component as any).initSearchingOpponentEvent();
      expect(spySubs).toHaveBeenCalled();
      expect(spyWSService).toHaveBeenCalled();
      expect(component.isLoading).toEqual(true);
    });
  });

  describe("initOpponentFoundEvent()", () => {
    it("should subscribe opponentFound wsService event", () => {
      component.isLoading = false;
      const spySubs = spyOn((component as any).subscriptions, "add");
      const opponent = { ownerName: "foo" } as Character;
      const spyWSService = spyOn(wSService, "opponentFound").and.returnValue(
        of(opponent)
      );
      (component as any).initOpponentFoundEvent();
      expect(spySubs).toHaveBeenCalled();
      expect(spyWSService).toHaveBeenCalled();
      expect(component.isLoading).toEqual(false);
      expect(component.currentTurn.number).toEqual(1);
      expect(component.opponentFighter).toEqual(opponent);
      expect(component.opponentOwnerName).toEqual(opponent.ownerName);
    });
  });

  describe("initTurnResultsEvent()", () => {
    it("should subscribe turnResults wsService event", () => {
      component.isLoading = false;
      const spySubs = spyOn((component as any).subscriptions, "add");
      const spyWSService = spyOn(wSService, "turnResults").and.returnValue(
        of({})
      );
      (component as any).initTurnResultsEvent();
      expect(spySubs).toHaveBeenCalled();
      expect(spyWSService).toHaveBeenCalled();
      expect(component.currentTurn).toEqual({});
    });
  });

  describe("initEndEvent()", () => {
    it("should subscribe end wsService event", () => {
      component.fighter = {
        _id: "1",
      } as Character;
      component.opponentFighter = {
        _id: "2",
      } as Character;
      const spySubs = spyOn((component as any).subscriptions, "add");
      const spyGoToFightPage = spyOn(component as any, "goToFightPage");
      const spyWSService = spyOn(wSService, "end").and.returnValue(
        of({ winnerId: "1" })
      );
      (component as any).initEndEvent();
      expect(spySubs).toHaveBeenCalled();
      expect(spyWSService).toHaveBeenCalled();
      expect(component.finalResults).toEqual({ winnerId: "1" });
      expect(component.fighterWinner).toEqual(true);
      expect(component.opponentWinner).toEqual(false);
      expect(spyGoToFightPage).toHaveBeenCalled();
    });
  });

  describe("initDemands()", () => {
    beforeEach(() => {
      component.user = userSaved;
    });

    it("should call all initSub event()", () => {
      const spyDisconnectEvent = spyOn(component as any, "iniDisconnectEvent");
      const spySearchingOpponentEvent = spyOn(
        component as any,
        "initSearchingOpponentEvent"
      );
      const spyOpponentFoundEvent = spyOn(
        component as any,
        "initOpponentFoundEvent"
      );
      const spyTurnResultsEvent = spyOn(
        component as any,
        "initTurnResultsEvent"
      );
      const spyWSService = spyOn(wSService, "searchOpponent");
      const spyEndEvent = spyOn(component as any, "initEndEvent");
      (component as any).initDemands();
      expect(spyDisconnectEvent).toHaveBeenCalled();
      expect(spySearchingOpponentEvent).toHaveBeenCalled();
      expect(spyOpponentFoundEvent).toHaveBeenCalled();
      expect(spyTurnResultsEvent).toHaveBeenCalled();
      expect(spyEndEvent).toHaveBeenCalled();
      expect(spyWSService).toHaveBeenCalledWith(
        component.user._id,
        component.fighter
      );
    });
  });

  describe("goToFightPage()", () => {
    it("should redirect to dashboard (delayed)", () => {
      const spy = spyOn(router, "navigate");
      const delay = Number(component.timeLeftBeforeNavigation) * 1000 + 2000;
      (component as any).goToFightPage();
      jest.advanceTimersByTime(delay);
      expect(spy).toHaveBeenCalledWith(["/dashboard/characters"], {
        queryParams: { refresh: true },
      });
    });
  });

  describe("ngOnDestroy()", () => {
    it("should unsubscribe all subscriptions", () => {
      const spy = spyOn((component as any).subscriptions, "unsubscribe");
      component.ngOnDestroy();
      expect(spy).toHaveBeenCalled();
    });
  });
});
