import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { StorageService } from "app/services/storage.service";

import { LobbyGuard } from "./lobby.guard";

describe("LobbyGuard", () => {
  let guard: LobbyGuard;

  let storageService: StorageService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StorageService,
          useValue: {
            getItem: jest.fn(),
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
    guard = TestBed.inject(LobbyGuard);
    storageService = TestBed.inject(StorageService);
    router = TestBed.inject(Router);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });

  describe("canActivate()", () => {
    it("should return TRUE if fighter found in storage", () => {
      const spyStorage = spyOn(storageService, "getItem").and.returnValue({});
      const test = guard.canActivate();
      expect(test).toEqual(true);
      expect(spyStorage).toHaveBeenCalled();
    });

    it("should return FALSE if no fighter found in storage, than redirect to dashboard", () => {
      const spyStorage = spyOn(storageService, "getItem").and.returnValue(
        undefined
      );
      const spyRouter = spyOn(router, "navigateByUrl");
      const test = guard.canActivate();
      expect(test).toEqual(false);
      expect(spyStorage).toHaveBeenCalled();
      expect(spyRouter).toHaveBeenCalledWith("dashboard/characters");
    });
  });
});
