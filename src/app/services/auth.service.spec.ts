import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { User } from "app/interfaces/user";
import { environment } from "environments/environment";
import { of, throwError } from "rxjs";

import { AuthService } from "./auth.service";
import { StorageService } from "./storage.service";

describe("AuthService", () => {
  let service: AuthService;

  let storageService: StorageService;
  let httpClient: HttpClient;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StorageService,
          useValue: {
            getItem: jest.fn(),
            removeItem: jest.fn(),
          },
        },
        {
          provide: Router,
          useValue: {
            navigateByUrl: jest.fn(),
          },
        },
        {
          provide: HttpClient,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    });

    storageService = TestBed.inject(StorageService);
    httpClient = TestBed.inject(HttpClient);
    router = TestBed.inject(Router);

    service = TestBed.inject(AuthService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("isAuthenticated()", () => {
    it("should return TRUE if user account found", () => {
      const spyStorageService = spyOn(
        storageService,
        "getItem"
      ).and.returnValues({ name: "userName" });
      const test = service.isAuthenticated();
      expect(test).toEqual(true);
      expect(spyStorageService).toHaveBeenCalledWith("account", true);
    });

    it("should return FALSE if user account found", () => {
      const spyStorageService = spyOn(
        storageService,
        "getItem"
      ).and.returnValues(undefined);
      const test = service.isAuthenticated();
      expect(test).toEqual(false);
      expect(spyStorageService).toHaveBeenCalledWith("account", true);
    });
  });

  describe("signup()", () => {
    it("should return http call for user", async () => {
      const spyHttpClient = spyOn(httpClient, "post").and.returnValues(
        of({ name: "userName" } as User)
      );
      const user = await service.signup("aName", "p@ssword").toPromise();
      expect(user).toEqual({ name: "userName" });
      expect(spyHttpClient).toHaveBeenCalledWith(
        `${environment.backendUrl}users`,
        {
          name: "aName",
          password: "p@ssword",
        }
      );
    });

    it("should return http call error if occurs", async () => {
      const spyHttpClient = spyOn(httpClient, "post").and.returnValues(
        throwError({ error: { message: "an error" } })
      );

      try {
        await service.signup("aName", "p@ssword").toPromise();
      } catch (error) {
        expect(error).toEqual("an error");
        expect(spyHttpClient).toHaveBeenCalledWith(
          `${environment.backendUrl}users`,
          {
            name: "aName",
            password: "p@ssword",
          }
        );
      }
    });
  });

  describe("signin()", () => {
    it("should return http call for user", async () => {
      const spyHttpClient = spyOn(httpClient, "post").and.returnValues(
        of({ name: "userName" } as User)
      );
      const user = await service.signin("aName", "p@ssword").toPromise();
      expect(user).toEqual({ name: "userName" });
      expect(spyHttpClient).toHaveBeenCalledWith(
        `${environment.backendUrl}users/login`,
        {
          name: "aName",
          password: "p@ssword",
        }
      );
    });

    it("should return http call error if occurs", async () => {
      const spyHttpClient = spyOn(httpClient, "post").and.returnValues(
        throwError({ error: { message: "an error" } })
      );

      try {
        await service.signin("aName", "p@ssword").toPromise();
      } catch (error) {
        expect(error).toEqual("an error");
        expect(spyHttpClient).toHaveBeenCalledWith(
          `${environment.backendUrl}users/login`,
          {
            name: "aName",
            password: "p@ssword",
          }
        );
      }
    });
  });

  describe("logout()", () => {
    it("should clear localStorage and redirect to home", () => {
      const spyStorageService = spyOn(storageService, "removeItem");
      const spyRouter = spyOn(router, "navigateByUrl");
      service.logout();
      expect(spyStorageService).toHaveBeenNthCalledWith(1, "account");
      expect(spyStorageService).toHaveBeenNthCalledWith(2, "fighter");
      expect(spyRouter).toHaveBeenCalledWith("/home");
    });
  });
});
