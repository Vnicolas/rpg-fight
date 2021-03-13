import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IconsModule } from "app/icons.module";
import { User } from "app/interfaces/user";
import { AuthService } from "app/services/auth.service";
import { UserService } from "app/services/user.service";
import { BehaviorSubject } from "rxjs";

import { NavbarComponent } from "./navbar.component";

describe("NavbarComponent", () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  let authService: AuthService;
  let userService: UserService;

  const userSaved = {
    _id: "1",
    name: "john",
    characters: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsModule],
      declarations: [NavbarComponent],
      providers: [
        {
          provide: AuthService,
          useValue: {
            logout: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            user: new BehaviorSubject<User>(userSaved),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    userService = TestBed.inject(UserService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit()", () => {
    it("should set user from userService", () => {
      component.ngOnInit();
      expect(component.user).toEqual(userSaved);
    });
  });

  describe("signOut()", () => {
    it("should call authService.logout()", () => {
      const spyAuthService = spyOn(authService, "logout");
      component.signOut();
      expect(spyAuthService).toHaveBeenCalled();
    });
  });
});
