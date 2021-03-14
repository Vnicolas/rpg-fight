import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { IconsModule } from "app/icons.module";
import { CharactersService } from "app/services/characters.service";
import { UserService } from "app/services/user.service";
import { MockComponent } from "ng-mocks";

import { CharactersListComponent } from "./characters-list.component";
import { CharacterInfosComponent } from "../character-infos/character-infos.component";
import { PipesModule } from "app/shared/pipes/pipes.module";
import { Character } from "app/interfaces/character.interface";
import { of, throwError } from "rxjs";

describe("CharactersListComponent", () => {
  let component: CharactersListComponent;
  let fixture: ComponentFixture<CharactersListComponent>;

  let userService: UserService;
  let charactersService: CharactersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsModule, PipesModule, RouterTestingModule.withRoutes([])],
      declarations: [
        CharactersListComponent,
        MockComponent(CharacterInfosComponent),
      ],
      providers: [
        {
          provide: UserService,
          useValue: {
            updateUser: jest.fn(),
            deleteUserCharacter: jest.fn(),
          },
        },
        {
          provide: CharactersService,
          useValue: {
            getFighter: jest.fn(),
            unSelectFighter: jest.fn(),
            selectFighter: jest.fn(),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersListComponent);
    component = fixture.componentInstance;

    userService = TestBed.inject(UserService);
    charactersService = TestBed.inject(CharactersService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit()", () => {
    it("should set fighterSelected with characterService.getFighter()", () => {
      const spyCharactersService = spyOn(
        charactersService,
        "getFighter"
      ).and.returnValue("fighter");
      component.ngOnInit();
      expect(spyCharactersService).toHaveBeenCalled();
      expect(component.fighterSelected).toEqual("fighter");
    });
  });

  describe("deleteCharacter()", () => {
    it("should call userService.deleteUserCharacter", () => {
      component.user = {
        _id: "1",
        name: "john",
        characters: [{ _id: "characterId" } as Character],
      };
      const spySubs = spyOn((component as any).subscriptions, "add");
      const spyUserService = spyOn(
        userService,
        "deleteUserCharacter"
      ).and.returnValue(of("updatedUser"));
      const spyUserServiceUpdate = spyOn(
        userService,
        "updateUser"
      ).and.returnValue("fighter");
      component.deleteCharacter("characterId");
      expect(spySubs).toHaveBeenCalled();
      expect(spyUserService).toHaveBeenCalledWith(
        "characterId",
        component.user._id
      );
      expect(spyUserServiceUpdate).toHaveBeenCalledWith("updatedUser");
    });

    it("should set errorMessage if error occurs", () => {
      component.user = {
        _id: "1",
        name: "john",
        characters: [{ _id: "characterId" } as Character],
      };
      const spySubs = spyOn((component as any).subscriptions, "add");
      const spyUserService = spyOn(
        userService,
        "deleteUserCharacter"
      ).and.returnValue(throwError("An error"));
      const spyUserServiceUpdate = spyOn(
        userService,
        "updateUser"
      ).and.returnValue("fighter");
      component.deleteCharacter("characterId");
      expect(spySubs).toHaveBeenCalled();
      expect(spyUserService).toHaveBeenCalledWith(
        "characterId",
        component.user._id
      );
      expect(spyUserServiceUpdate).not.toHaveBeenCalled();
      expect(component.errorMessage).toEqual("An error");
    });
  });

  describe("viewCharacter()", () => {
    it("should set characterSelected if found", () => {
      const characters = [
        { _id: "characterId" } as Character,
        { _id: "characterId2" } as Character,
      ];
      component.user = {
        _id: "1",
        name: "john",
        characters,
      };
      component.viewCharacter("characterId");
      expect(component.characterSelected).toEqual({ _id: "characterId" });
      expect(component.isCharacterModalActive).toEqual(true);
    });

    it("should set errorMessage if not found", () => {
      const characters = [{ _id: "characterId" } as Character];
      component.user = {
        _id: "1",
        name: "john",
        characters,
      };
      component.viewCharacter("characterId2");
      expect(component.characterSelected).toBeUndefined();
      expect(component.isCharacterModalActive).toEqual(false);
    });
  });

  describe("select()", () => {
    it("should set fighterSelected if found", () => {
      const character = { _id: "characterId" } as Character;
      const spy = spyOn(charactersService, "selectFighter");
      component.select(character);
      expect(component.fighterSelected).toEqual({ _id: "characterId" });
      expect(spy).toHaveBeenCalled();
    });

    it("should unset fighterSelected if already selected", () => {
      const character = { _id: "characterId" } as Character;
      component.fighterSelected = character;
      const spy = spyOn(charactersService, "unSelectFighter");
      component.select(character);
      expect(component.fighterSelected).toBeUndefined();
      expect(spy).toHaveBeenCalled();
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
