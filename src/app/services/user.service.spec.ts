import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { Character } from "app/interfaces/character.interface";
import { environment } from "environments/environment";
import { of, throwError } from "rxjs";

import { UserService } from "./user.service";
import { StorageService } from "./storage.service";
import { User } from "app/interfaces/user";

describe("UserService", () => {
  let service: UserService;

  let storageService: StorageService;
  let httpClient: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StorageService,
          useValue: {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
          },
        },
        {
          provide: HttpClient,
          useValue: {
            post: jest.fn(),
            delete: jest.fn(),
            get: jest.fn(),
          },
        },
      ],
    });

    storageService = TestBed.inject(StorageService);
    httpClient = TestBed.inject(HttpClient);

    service = TestBed.inject(UserService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("updateUser()", () => {
    it("should return empty user if param is falsy", () => {
      const spy = spyOn(service.user, "next");
      service.updateUser((undefined as unknown) as User);
      expect(spy).toBeCalledWith({});
    });

    it("should set user", () => {
      const character = { status: "Ready" } as Character;
      const user = { characters: [character] } as User;
      const spy = spyOn(service.user, "next");
      const spySetCharacter = spyOn(
        service as any,
        "setCharacterDisplayInformations"
      ).and.returnValue({ status: "Ready", statusClass: "is-success" });
      service.updateUser(user);
      expect(spySetCharacter).toBeCalledWith(character);
      expect(spy).toBeCalledWith({
        characters: [
          {
            status: "Ready",
            statusClass: "is-success",
          },
        ],
      });
    });
  });

  describe("createUserCharacter()", () => {
    it("should return http call for user's character", async () => {
      const spyHttpClient = spyOn(httpClient, "post").and.returnValues(
        of({ name: "ada" } as Character)
      );
      const character = await service
        .createUserCharacter("ada", "1")
        .toPromise();
      expect(character).toEqual({ name: "ada" });
      expect(spyHttpClient).toHaveBeenCalledWith(
        `${environment.backendUrl}users/1/characters`,
        {
          name: "ada",
        }
      );
    });

    it("should return http call error if occurs", async () => {
      const spyHttpClient = spyOn(httpClient, "post").and.returnValues(
        throwError({ error: { message: "an error" } })
      );
      try {
        await service.createUserCharacter("ada", "1").toPromise();
      } catch (error) {
        expect(error).toEqual("an error");
        expect(spyHttpClient).toHaveBeenCalledWith(
          `${environment.backendUrl}users/1/characters`,
          {
            name: "ada",
          }
        );
      }
    });
  });

  describe("deleteUserCharacter()", () => {
    it("should return http call for user's character deleted", async () => {
      const spyHttpClient = spyOn(httpClient, "delete").and.returnValues(
        of({ name: "john" } as User)
      );
      const character = await service
        .deleteUserCharacter("1", "99")
        .toPromise();
      expect(character).toEqual({ name: "john" });
      expect(spyHttpClient).toHaveBeenCalledWith(
        `${environment.backendUrl}users/99/characters/1`
      );
    });

    it("should return http call error if occurs", async () => {
      const spyHttpClient = spyOn(httpClient, "delete").and.returnValues(
        throwError({ error: { message: "an error" } })
      );
      try {
        await service.deleteUserCharacter("1", "99").toPromise();
      } catch (error) {
        expect(error).toEqual("an error");
        expect(spyHttpClient).toHaveBeenCalledWith(
          `${environment.backendUrl}users/99/characters/1`
        );
      }
    });
  });

  describe("getUserCharacters()", () => {
    it("should return http call for user's characters", async () => {
      const spyHttpClient = spyOn(httpClient, "get").and.returnValues(
        of([{ name: "ada" }] as Character[])
      );
      const character = await service.getUserCharacters("99").toPromise();
      expect(character).toEqual([{ name: "ada" }]);
      expect(spyHttpClient).toHaveBeenCalledWith(
        `${environment.backendUrl}characters?owner=99`
      );
    });

    it("should return http call error if occurs", async () => {
      const spyHttpClient = spyOn(httpClient, "get").and.returnValues(
        throwError({ error: { message: "an error" } })
      );
      try {
        await service.getUserCharacters("99").toPromise();
      } catch (error) {
        expect(error).toEqual("an error");
        expect(spyHttpClient).toHaveBeenCalledWith(
          `${environment.backendUrl}characters?owner=99`
        );
      }
    });
  });

  describe("setCharacterDisplayInformations()", () => {
    it("should return character with its status", () => {
      const test = (service as any).setCharacterDisplayInformations({
        status: "Ready",
      } as Character);
      expect(test).toEqual({ status: "Ready", statusClass: "is-success" });
    });
  });
});
