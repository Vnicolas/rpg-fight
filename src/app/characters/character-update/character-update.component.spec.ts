import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { CharactersService } from "app/services/characters.service";
import { SkillsService } from "app/services/skills.service";
import { UserService } from "app/services/user.service";
import { PipesModule } from "app/shared/pipes/pipes.module";
import { MockComponent } from "ng-mocks";
import { SkillUpdaterComponent } from "../skill-updater/skill-updater.component";

import { BehaviorSubject, of, throwError } from "rxjs";

import { CharacterUpdateComponent } from "./character-update.component";
import { User } from "app/interfaces/user";
import {
  Character,
  CharacterFightProperty,
  Points,
} from "app/interfaces/character.interface";

function initPoint(): Points {
  return {
    initialPoints: 0,
    finalPoints: 0,
    costs: [],
  };
}

describe("CharacterUpdateComponent", () => {
  let component: CharacterUpdateComponent;
  let fixture: ComponentFixture<CharacterUpdateComponent>;

  let userService: UserService;
  let charactersService: CharactersService;
  let skillsService: SkillsService;
  const userSaved = {
    _id: "1",
    name: "john",
    characters: [],
  };
  let activatedRoute: ActivatedRoute;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipesModule, RouterTestingModule.withRoutes([])],
      declarations: [
        CharacterUpdateComponent,
        MockComponent(SkillUpdaterComponent),
      ],
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
        {
          provide: SkillsService,
          useValue: {
            canAddPoints: jest.fn(),
            getDivided: jest.fn(),
            canRemovePoints: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            user: new BehaviorSubject<User>(userSaved),
            updateUser: jest.fn(),
            deleteUserCharacter: jest.fn(),
          },
        },
        {
          provide: CharactersService,
          useValue: {
            updatePoints: {
              pipe: jest.fn(),
              subscribe: (fn: (value: Data) => void) => jest.fn(),
            },
          },
        },
        {
          provide: Router,
          useValue: {
            navigateByUrl: jest.fn(),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterUpdateComponent);

    userService = TestBed.inject(UserService);
    charactersService = TestBed.inject(CharactersService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    skillsService = TestBed.inject(SkillsService);

    component = fixture.componentInstance;
    component.skills = {
      health: initPoint(),
      attack: initPoint(),
      defense: initPoint(),
      magik: initPoint(),
      skillPoints: {
        initialPoints: 12,
        finalPoints: 0,
        costs: [],
      },
    };
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit()", () => {
    it("should redirect to dashboard if character has no skill points available", () => {
      const characterData = { character: { skillPoints: 0 } as Character };
      spyOn(activatedRoute.data, "pipe").and.returnValue(of(characterData));
      const spyInitSkills = spyOn(component as any, "initSkills");
      const spyRedirect = spyOn(component as any, "goToDashboard");
      component.ngOnInit();
      expect(spyInitSkills).not.toHaveBeenCalled();
      expect(spyRedirect).toHaveBeenCalled();
    });

    it("should call initSkills", () => {
      const characterData = { character: { skillPoints: 1 } as Character };
      spyOn(activatedRoute.data, "pipe").and.returnValue(of(characterData));
      const spyInitSkills = spyOn(component as any, "initSkills");
      component.ngOnInit();
      expect(spyInitSkills).toHaveBeenCalledWith(characterData.character);
    });

    it("should set user", () => {
      const characterData = { character: { skillPoints: 1 } as Character };
      spyOn(activatedRoute.data, "pipe").and.returnValue(of(characterData));
      spyOn(userService, "user").and.returnValue(of({ _id: "UserId" } as User));
      const spySubs = spyOn((component as any).subscriptions, "add");
      component.ngOnInit();
      expect((component as any).user).toEqual(userSaved);
      expect(spySubs).toHaveBeenCalled();
    });
  });

  describe("addPoints", () => {
    it("should call addHealthPoint() if skill === 'health'", () => {
      const spy = spyOn(component as any, "addHealthPoint").and.returnValue(
        jest.fn()
      );
      component.addPoints(CharacterFightProperty.HEALTH);
      expect(spy).toHaveBeenCalled();
    });

    it("should call addPoint() if skill === 'attack'", () => {
      const spy = spyOn(component as any, "addPoint").and.returnValue(
        jest.fn()
      );
      component.addPoints(CharacterFightProperty.ATTAK);
      expect(spy).toHaveBeenCalled();
    });
    it("should call addPoint() if skill === 'defense'", () => {
      const spy = spyOn(component as any, "addPoint").and.returnValue(
        jest.fn()
      );
      component.addPoints(CharacterFightProperty.DEFENSE);
      expect(spy).toHaveBeenCalled();
    });
    it("should call addPoint() if skill === 'magik'", () => {
      const spy = spyOn(component as any, "addPoint").and.returnValue(
        jest.fn()
      );
      component.addPoints(CharacterFightProperty.MAGIK);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("removePoints", () => {
    it("should call removeHealthPoint() if skill === 'health'", () => {
      const spy = spyOn(component as any, "removeHealthPoint").and.returnValue(
        jest.fn()
      );
      component.removePoints(CharacterFightProperty.HEALTH);
      expect(spy).toHaveBeenCalled();
    });

    it("should call removePoint() if skill === 'attack'", () => {
      const spy = spyOn(component as any, "removePoint").and.returnValue(
        jest.fn()
      );
      component.removePoints(CharacterFightProperty.ATTAK);
      expect(spy).toHaveBeenCalled();
    });
    it("should call removePoint() if skill === 'defense'", () => {
      const spy = spyOn(component as any, "removePoint").and.returnValue(
        jest.fn()
      );
      component.removePoints(CharacterFightProperty.DEFENSE);
      expect(spy).toHaveBeenCalled();
    });
    it("should call removePoint() if skill === 'magik'", () => {
      const spy = spyOn(component as any, "removePoint").and.returnValue(
        jest.fn()
      );
      component.removePoints(CharacterFightProperty.MAGIK);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("update()", () => {
    it("should update character and redirect to dashboard", () => {
      const character = {
        _id: "characterId",
      } as Character;
      (component as any).user = userSaved;
      (component as any).user.characters = [character];
      component.character = { _id: "characterId" } as Character;
      const spyCharactersService = spyOn(
        charactersService,
        "updatePoints"
      ).and.returnValue(of(character));
      const spyUserService = spyOn(userService, "updateUser");
      const spyRedirect = spyOn(
        component as any,
        "goToDashboard"
      ).and.returnValue(jest.fn());
      component.update();
      expect(spyCharactersService).toHaveBeenCalled();
      expect((component as any).user.characters[0]).toEqual(character);
      expect(spyUserService).toHaveBeenCalledWith((component as any).user);
      expect(spyRedirect).toHaveBeenCalled();
    });

    it("should set errorMessage if error occurs", () => {
      const character = {
        _id: "characterId",
      } as Character;
      (component as any).user = userSaved;
      (component as any).user.characters = [character];
      component.character = { _id: "characterId" } as Character;
      const spyCharactersService = spyOn(
        charactersService,
        "updatePoints"
      ).and.returnValue(throwError("An error"));
      component.update();
      expect(spyCharactersService).toHaveBeenCalled();
      expect(component.errorMessage).toEqual("An error");
    });
  });

  describe("goToDashboard", () => {
    it("should redirect to dashboard", () => {
      const spy = spyOn(router, "navigateByUrl");
      (component as any).goToDashboard();
      expect(spy).toHaveBeenCalledWith("/dashboard/characters");
    });
  });

  describe("initSkill", () => {
    it("should return points data", () => {
      const expected: Points = {
        initialPoints: 5,
        finalPoints: 5,
        costs: [],
      };
      const test = (component as any).initSkill(5);
      expect(test).toEqual(expected);
    });
  });

  describe("initSkills", () => {
    it("should set all points needed", () => {
      const character = {
        skillPoints: 12,
        health: 10,
        attack: 0,
        defense: 0,
        magik: 0,
      } as Character;
      const spy = spyOn(component as any, "initSkill").and.returnValue(0);
      (component as any).initSkills(character);
      expect(component.pointsAvailable).toEqual(12);
      expect(component.skills.health).toEqual(0);
      expect(component.skills.attack).toEqual(0);
      expect(component.skills.defense).toEqual(0);
      expect(component.skills.magik).toEqual(0);
      expect(spy).toHaveBeenCalledTimes(4);
    });
  });

  describe("addHealthPoint", () => {
    it("should set pointsAvailable and skills.health if pointsAvailable > 0", () => {
      component.pointsAvailable = 10;
      component.skills.health.finalPoints = 10;
      (component as any).addHealthPoint();
      expect(component.pointsAvailable).toEqual(9);
      expect(component.skills.health.finalPoints).toEqual(11);
    });

    it("should not set pointsAvailable and skills.health if pointsAvailable <= 0", () => {
      component.pointsAvailable = 0;
      component.skills.health.finalPoints = 10;
      (component as any).addHealthPoint();
      expect(component.pointsAvailable).toEqual(0);
      expect(component.skills.health.finalPoints).toEqual(10);
    });
  });

  describe("addPoint", () => {
    it("should set skill points if possible", () => {
      component.pointsAvailable = 10;
      component.skills.health.finalPoints = 10;
      component.skills.health.costs = [];
      const spyCanAddPoints = spyOn(
        skillsService,
        "canAddPoints"
      ).and.returnValue(true);
      const spyDivided = spyOn(skillsService, "getDivided").and.returnValue(5);
      (component as any).addPoint("health");
      expect(spyCanAddPoints).toHaveBeenCalledWith(10);
      expect(spyDivided).toHaveBeenCalledWith(10);
      expect(component.pointsAvailable).toEqual(5);
      expect(component.skills.health.finalPoints).toEqual(11);
      expect(component.skills.health.costs).toEqual([5]);
    });

    it("should not set skill points if not possible", () => {
      component.pointsAvailable = 10;
      component.skills.health.finalPoints = 10;
      component.skills.health.costs = [];
      const spyCanAddPoints = spyOn(
        skillsService,
        "canAddPoints"
      ).and.returnValue(false);
      const spyDivided = spyOn(skillsService, "getDivided");
      (component as any).addPoint("health");
      expect(spyCanAddPoints).toHaveBeenCalledWith(10);
      expect(spyDivided).not.toHaveBeenCalledWith(10);
      expect(component.pointsAvailable).toEqual(10);
      expect(component.skills.health.finalPoints).toEqual(10);
      expect(component.skills.health.costs).toEqual([]);
    });
  });

  describe("canRemovePoint", () => {
    it("should return TRUE if possible", () => {
      component.skills.health.initialPoints = 10;
      component.skills.health.finalPoints = 20;
      const spyCanAddPoints = spyOn(
        skillsService,
        "canRemovePoints"
      ).and.returnValue(true);
      const test = (component as any).canRemovePoint("health");
      expect(spyCanAddPoints).toHaveBeenCalledWith(10, 20);
      expect(test).toEqual(true);
    });

    it("should return FALSE if possible", () => {
      component.skills.health.initialPoints = 10;
      component.skills.health.finalPoints = 20;
      const spyCanAddPoints = spyOn(
        skillsService,
        "canRemovePoints"
      ).and.returnValue(false);
      const test = (component as any).canRemovePoint("health");
      expect(spyCanAddPoints).toHaveBeenCalledWith(10, 20);
      expect(test).toEqual(false);
    });
  });

  describe("removePoint", () => {
    it("should set skill points if possible", () => {
      component.pointsAvailable = 9;
      component.skills.health.initialPoints = 10;
      component.skills.health.finalPoints = 11;
      component.skills.health.costs = [1];
      const spyCanRemovePoint = spyOn(
        component as any,
        "canRemovePoint"
      ).and.returnValue(true);
      (component as any).removePoint("health");
      expect(spyCanRemovePoint).toHaveBeenCalledWith("health");
      expect(component.pointsAvailable).toEqual(10);
      expect(component.skills.health.finalPoints).toEqual(10);
      expect(component.skills.health.costs).toEqual([]);
    });

    it("should not set skill points if not possible", () => {
      component.pointsAvailable = 9;
      component.skills.health.initialPoints = 10;
      component.skills.health.finalPoints = 11;
      component.skills.health.costs = [1];
      const spyCanRemovePoint = spyOn(
        component as any,
        "canRemovePoint"
      ).and.returnValue(false);
      (component as any).removePoint("health");
      expect(spyCanRemovePoint).toHaveBeenCalledWith("health");
      expect(component.pointsAvailable).toEqual(9);
      expect(component.skills.health.finalPoints).toEqual(11);
      expect(component.skills.health.costs).toEqual([1]);
    });
  });

  describe("removeHealthPoint", () => {
    it("should set pointsAvailable and skills.health if possible", () => {
      const spyCanRemovePoint = spyOn(
        component as any,
        "canRemovePoint"
      ).and.returnValue(true);
      component.pointsAvailable = 10;
      component.skills.health.finalPoints = 10;
      (component as any).removeHealthPoint();
      expect(spyCanRemovePoint).toHaveBeenCalledWith("health");
      expect(component.pointsAvailable).toEqual(11);
      expect(component.skills.health.finalPoints).toEqual(9);
    });

    it("should not set pointsAvailable and skills.health if not possible", () => {
      const spyCanRemovePoint = spyOn(
        component as any,
        "canRemovePoint"
      ).and.returnValue(false);
      component.pointsAvailable = 10;
      component.skills.health.finalPoints = 10;
      (component as any).removeHealthPoint();
      expect(spyCanRemovePoint).toHaveBeenCalledWith("health");
      expect(component.pointsAvailable).toEqual(10);
      expect(component.skills.health.finalPoints).toEqual(10);
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
