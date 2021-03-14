import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { IconsModule } from "app/icons.module";
import { AuthService } from "app/services/auth.service";
import { StorageService } from "app/services/storage.service";
import { UserService } from "app/services/user.service";
import { of, throwError } from "rxjs";

import { HomeComponent } from "./home.component";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let authService: AuthService;
  let storageService: StorageService;
  let userService: UserService;
  let router: Router;

  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsModule, FormsModule, RouterTestingModule.withRoutes([])],
      declarations: [HomeComponent],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signup: jest.fn(),
            signin: jest.fn(),
          },
        },
        {
          provide: StorageService,
          useValue: {
            getItem: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            updateUser: jest.fn(),
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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    storageService = TestBed.inject(StorageService);
    authService = TestBed.inject(AuthService);
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit()", () => {
    it("should redirect to dashboard if user alreay signed", () => {
      const spyStorage = spyOn(storageService, "getItem").and.returnValue(
        "user"
      );
      const spyRedirect = spyOn(component as any, "goToDashboard");
      component.ngOnInit();
      expect(spyStorage).toHaveBeenCalled();
      expect(spyRedirect).toHaveBeenCalled();
    });
  });

  describe("signup()", () => {
    it("should not call authService.signup() if !checkFields", () => {
      spyOn(component, "checkFields").and.returnValue(false);
      const spyAuthService = spyOn(authService, "signup");
      component.signup();
      expect(spyAuthService).not.toHaveBeenCalled();
    });

    it("should call authService.signup() if checkFields", () => {
      const valueReturned = {
        _id: "1",
        name: "john",
        characters: [],
      };
      const spyAuthService = spyOn(authService, "signup").and.returnValue(
        of(valueReturned)
      );
      const spySubs = spyOn((component as any).subscriptions, "add");
      spyOn(component, "checkFields").and.returnValue(true);
      const spyUpdateUser = spyOn(userService, "updateUser").and.returnValue(
        jest.fn()
      );
      const spyRedirect = spyOn(
        component as any,
        "goToDashboard"
      ).and.returnValue(jest.fn());
      component.username = "john";
      component.password = "p@ssword";
      component.signup();
      expect(spySubs).toHaveBeenCalled();
      expect(spyUpdateUser).toHaveBeenCalled();
      expect(spyAuthService).toHaveBeenCalledWith(
        component.username,
        component.password
      );
      expect(spyRedirect).toHaveBeenCalled();
    });

    it("should set errorMessage if an error occurs", () => {
      const spyAuthService = spyOn(authService, "signup").and.returnValue(
        throwError("An error")
      );
      const spySubs = spyOn((component as any).subscriptions, "add");
      spyOn(component, "checkFields").and.returnValue(true);
      const spyUpdateUser = spyOn(userService, "updateUser").and.returnValue(
        jest.fn()
      );
      const spyRedirect = spyOn(
        component as any,
        "goToDashboard"
      ).and.returnValue(jest.fn());
      component.username = "john";
      component.password = "p@ssword";
      component.signup();
      expect(spySubs).toHaveBeenCalled();
      expect(spyAuthService).toHaveBeenCalledWith(
        component.username,
        component.password
      );
      expect(spyUpdateUser).not.toHaveBeenCalled();
      expect(spyRedirect).not.toHaveBeenCalled();
      expect(component.errorMessage).toEqual("An error");
    });
  });

  describe("signin()", () => {
    it("should not call authService.signin() if !checkFields", () => {
      spyOn(component, "checkFields").and.returnValue(false);
      const spyAuthService = spyOn(authService, "signin");
      component.signin();
      expect(spyAuthService).not.toHaveBeenCalled();
    });

    it("should call authService.signin() if checkFields", () => {
      const valueReturned = {
        _id: "1",
        name: "john",
        characters: [],
      };
      const spyAuthService = spyOn(authService, "signin").and.returnValue(
        of(valueReturned)
      );
      const spySubs = spyOn((component as any).subscriptions, "add");
      spyOn(component, "checkFields").and.returnValue(true);
      const spyUpdateUser = spyOn(userService, "updateUser").and.returnValue(
        jest.fn()
      );
      const spyRedirect = spyOn(
        component as any,
        "goToDashboard"
      ).and.returnValue(jest.fn());
      component.username = "john";
      component.password = "p@ssword";
      component.signin();
      expect(spySubs).toHaveBeenCalled();
      expect(spyUpdateUser).toHaveBeenCalled();
      expect(spyAuthService).toHaveBeenCalledWith(
        component.username,
        component.password
      );
      expect(spyRedirect).toHaveBeenCalled();
    });

    it("should set errorMessage if an error occurs", () => {
      const spyAuthService = spyOn(authService, "signin").and.returnValue(
        throwError("An error")
      );
      const spySubs = spyOn((component as any).subscriptions, "add");
      spyOn(component, "checkFields").and.returnValue(true);
      const spyUpdateUser = spyOn(userService, "updateUser").and.returnValue(
        jest.fn()
      );
      const spyRedirect = spyOn(
        component as any,
        "goToDashboard"
      ).and.returnValue(jest.fn());
      component.username = "john";
      component.password = "p@ssword";
      component.signin();
      expect(spySubs).toHaveBeenCalled();
      expect(spyAuthService).toHaveBeenCalledWith(
        component.username,
        component.password
      );
      expect(spyUpdateUser).not.toHaveBeenCalled();
      expect(spyRedirect).not.toHaveBeenCalled();
      expect(component.errorMessage).toEqual("An error");
    });
  });

  describe("checkFields", () => {
    it("should return FALSE if !this.username", () => {
      component.username = "";
      component.password = "p@ssword";
      const test = component.checkFields();
      expect(test).toEqual(false);
    });

    it("should return FALSE if !this.password", () => {
      component.username = "user";
      component.password = "";
      const test = component.checkFields();
      expect(test).toEqual(false);
    });

    it("should return TRUE if !this.password", () => {
      component.username = "user";
      component.password = "p@ssword";
      const test = component.checkFields();
      expect(test).toEqual(true);
    });
  });

  describe("goToDashboard", () => {
    it("should redirect to dashboard", () => {
      const spy = spyOn(router, "navigateByUrl");
      (component as any).goToDashboard();
      expect(spy).toHaveBeenCalledWith("/dashboard/characters");
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
