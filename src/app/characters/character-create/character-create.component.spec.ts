import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { IconsModule } from "app/icons.module";
import { Character } from "app/interfaces/character.interface";
import { UserService } from "app/services/user.service";
import { of, throwError } from "rxjs";
import { CharacterCreateComponent } from "./character-create.component";

describe("CharacterCreateComponent", () => {
  let component: CharacterCreateComponent;
  let fixture: ComponentFixture<CharacterCreateComponent>;

  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsModule, FormsModule],
      declarations: [CharacterCreateComponent],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUserCharacter: jest.fn(),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterCreateComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("createCharacter()", () => {
    it("should set errorMessage if no newCharacterName", () => {
      component.newCharacterName = "";
      component.createCharacter();
      expect(component.errorMessage).toEqual("Please give a name");
    });

    it("should emit event for created character", () => {
      component.newCharacterName = "test";
      const characterCreated = { _id: "1" } as Character;
      const spySubs = spyOn((component as any).subscriptions, "add");
      const spyCharacterCreated = spyOn(component.characterCreated, "emit");
      const spyUserService = spyOn(
        userService,
        "createUserCharacter"
      ).and.returnValue(of(characterCreated));
      component.createCharacter();
      expect(spyUserService).toHaveBeenCalled();
      expect(spySubs).toHaveBeenCalled();
      expect(spyCharacterCreated).toHaveBeenCalled();
      expect(component.newCharacterName).toEqual("");
    });

    it("should set errorMessage if error occurs in createUserCharacter call", () => {
      component.newCharacterName = "test";
      const spyUserService = spyOn(
        userService,
        "createUserCharacter"
      ).and.returnValue(throwError("An error"));
      component.createCharacter();
      expect(spyUserService).toHaveBeenCalled();
      expect(component.errorMessage).toEqual("An error");
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
