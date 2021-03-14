import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { IconsModule } from "app/icons.module";
import { User } from "app/interfaces/user";
import { UserService } from "app/services/user.service";
import { BehaviorSubject } from "rxjs";
import { MockComponent } from "ng-mocks";

import { CharactersListContainerComponent } from "./characters-list-container.component";
import { CharactersListComponent } from "../characters-list/characters-list.component";
import { CharacterCreateComponent } from "../character-create/character-create.component";
import { Character } from "app/interfaces/character.interface";
import { ActivatedRoute, Params } from "@angular/router";

describe("CharactersListContainerComponent", () => {
  let component: CharactersListContainerComponent;
  let fixture: ComponentFixture<CharactersListContainerComponent>;

  let userService: UserService;
  const userSaved = {
    _id: "1",
    name: "john",
    characters: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsModule, FormsModule],
      declarations: [
        CharactersListContainerComponent,
        MockComponent(CharactersListComponent),
        MockComponent(CharacterCreateComponent),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: {
              subscribe: (fn: (value: Params) => void) => jest.fn(),
            },
          },
        },
        {
          provide: UserService,
          useValue: {
            updateUser: jest.fn(),
            user: new BehaviorSubject<User>(userSaved),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersListContainerComponent);
    component = fixture.componentInstance;

    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit()", () => {
    it("should set user from userService", () => {
      const subsSpy = spyOn((component as any).subscriptions, "add");
      component.ngOnInit();
      expect(subsSpy).toHaveBeenCalled();
      expect(component.user).toEqual(userSaved);
    });
  });

  describe("updateUser()", () => {
    it("should call userService.updateUser()", () => {
      const spyUserService = spyOn(userService, "updateUser");
      const character = {} as Character;
      component.updateUser(character);
      expect(component.user.characters.length).toEqual(1);
      expect(spyUserService).toHaveBeenCalled();
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
