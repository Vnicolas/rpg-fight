import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { AuthService } from "app/services/auth.service";
import { StorageService } from "app/services/storage.service";

import { AuthGuard } from "./auth.guard";

describe("AuthGuard", () => {
  let guard: AuthGuard;

  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            isAuthenticated: jest.fn(),
          },
        },
        {
          provide: Router,
          useValue: {
            navigateByUrl: jest.fn(),
          },
        },
      ],
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });

  describe("canActivate()", () => {
    it("should return TRUE if user is authenticated", () => {
      const spyStorage = spyOn(authService, "isAuthenticated").and.returnValue(
        true
      );
      const test = guard.canActivate();
      expect(test).toEqual(true);
      expect(spyStorage).toHaveBeenCalled();
    });

    it("should return FALSE if user is not authenticated", () => {
      const spyStorage = spyOn(authService, "isAuthenticated").and.returnValue(
        false
      );
      const spyRouter = spyOn(router, "navigateByUrl");
      const test = guard.canActivate();
      expect(test).toEqual(false);
      expect(spyStorage).toHaveBeenCalled();
      expect(spyRouter).toHaveBeenCalledWith("home");
    });
  });
});
