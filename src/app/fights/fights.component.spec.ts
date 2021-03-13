import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Data } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { IconsModule } from "app/icons.module";
import { Character } from "app/interfaces/character.interface";
import { Fight } from "app/interfaces/fight.interface";
import { PipesModule } from "app/shared/pipes/pipes.module";
import { WON_OR_LOOSE } from "app/shared/utils";
import { of } from "rxjs";
import { FightsComponent } from "./fights.component";

describe("FightsComponent", () => {
  let component: FightsComponent;
  let fixture: ComponentFixture<FightsComponent>;

  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipesModule, IconsModule, RouterTestingModule.withRoutes([])],
      declarations: [FightsComponent],
      providers: [
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
    fixture = TestBed.createComponent(FightsComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit()", () => {
    it("should set character and fights", () => {
      const characterData = { character: { skillPoints: 0 } as Character };
      spyOn(activatedRoute.data, "pipe").and.returnValue(
        of({ character: characterData, fights: [{}] })
      );
      const spyGFetFightResult = spyOn(component as any, "getFightResult");
      component.ngOnInit();
      expect(spyGFetFightResult).toHaveBeenCalled();
      expect(component.character).toEqual(characterData);
      expect(component.fights).toEqual([undefined]);
    });
  });

  describe("getFightResult()", () => {
    it("should return a fight infos when won", () => {
      const characterId = "1";
      const fight: Fight = {
        winnerId: characterId,
        looserId: "2",
        winnerName: "foo",
        looserName: "bar",
        winnerOwnerName: "fooOwner",
        looserOwnerName: "barOwner",
        turns: [],
        createdAt: new Date().toISOString(),
      };
      const expected = {
        fightOpponentLabel: `@barOwner / bar`,
        winOrLoose: WON_OR_LOOSE.WON,
        tagClass: "is-success",
      };
      const test = (component as any).getFightResult(fight, characterId);
      expect(test.fightOpponentLabel).toEqual(expected.fightOpponentLabel);
      expect(test.winOrLoose).toEqual(expected.winOrLoose);
      expect(test.tagClass).toEqual(expected.tagClass);
    });

    it("should return a fight infos when loose", () => {
      const characterId = "1";
      const fight: Fight = {
        winnerId: "2",
        looserId: characterId,
        winnerName: "bar",
        looserName: "foo",
        winnerOwnerName: "barOwner",
        looserOwnerName: "fooOwner",
        turns: [],
        createdAt: new Date().toISOString(),
      };
      const expected = {
        fightOpponentLabel: `@barOwner / bar`,
        winOrLoose: WON_OR_LOOSE.LOOSE,
        tagClass: "is-danger",
      };
      const test = (component as any).getFightResult(fight, characterId);
      expect(test.fightOpponentLabel).toEqual(expected.fightOpponentLabel);
      expect(test.winOrLoose).toEqual(expected.winOrLoose);
      expect(test.tagClass).toEqual(expected.tagClass);
    });
  });
});
