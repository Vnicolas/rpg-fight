import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { Character, Point } from "app/interfaces/character.interface";
import { Fight } from "app/interfaces/fight.interface";
import { environment } from "environments/environment";
import { of, throwError } from "rxjs";

import { CharactersService } from "./characters.service";
import { StorageService } from "./storage.service";

describe("CharactersService", () => {
  let service: CharactersService;

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
            patch: jest.fn(),
            get: jest.fn(),
          },
        },
      ],
    });

    storageService = TestBed.inject(StorageService);
    httpClient = TestBed.inject(HttpClient);

    service = TestBed.inject(CharactersService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("updateCharacter()", () => {
    it("should return http call for user", async () => {
      const spyHttpClient = spyOn(httpClient, "patch").and.returnValues(
        of({ name: "characterName" } as Character)
      );
      const points = {
        healt: 15,
      } as Point;
      const user = await service.updateCharacter("1", points).toPromise();
      expect(user).toEqual({ name: "characterName" });
      expect(spyHttpClient).toHaveBeenCalledWith(
        `${environment.backendUrl}characters/1`,
        points
      );
    });

    it("should return http call error if occurs", async () => {
      const spyHttpClient = spyOn(httpClient, "patch").and.returnValues(
        throwError({ error: { message: "an error" } })
      );
      const points = {
        healt: 15,
      } as Point;
      try {
        await service.updateCharacter("1", points).toPromise();
      } catch (error) {
        expect(error).toEqual("an error");
        expect(spyHttpClient).toHaveBeenCalledWith(
          `${environment.backendUrl}characters/1`,
          points
        );
      }
    });
  });

  describe("getFights()", () => {
    it("should return http call for user", async () => {
      const fightsReturned = [{}] as Fight[];
      const spyHttpClient = spyOn(httpClient, "get").and.returnValues(
        of(fightsReturned)
      );
      const fights = await service.getFights("1").toPromise();
      expect(fights).toEqual(fightsReturned);
      expect(spyHttpClient).toHaveBeenCalledWith(
        `${environment.backendUrl}characters/1/fights`
      );
    });

    it("should return http call error if occurs", async () => {
      const spyHttpClient = spyOn(httpClient, "get").and.returnValues(
        throwError({ error: { message: "an error" } })
      );
      try {
        await service.getFights("1").toPromise();
      } catch (error) {
        expect(error).toEqual("an error");
        expect(spyHttpClient).toHaveBeenCalledWith(
          `${environment.backendUrl}characters/1/fights`
        );
      }
    });
  });

  describe("getFighter()", () => {
    it("should return fighter", () => {
      const spyStorageService = spyOn(
        storageService,
        "getItem"
      ).and.returnValues({ name: "fighterName" });
      const test = service.getFighter();
      expect(test).toEqual({ name: "fighterName" });
      expect(spyStorageService).toHaveBeenCalledWith("fighter", true);
    });
  });

  describe("selectFighter()", () => {
    afterEach(() => {
      localStorage.clear();
    });

    it("should set fighter", () => {
      const character = { _id: "1" } as Character;
      const spyStorageService = spyOn(storageService, "setItem");
      service.selectFighter(character);
      expect(spyStorageService).toHaveBeenCalledWith(
        "fighter",
        character,
        true
      );
    });
  });

  describe("unSelectFighter()", () => {
    afterEach(() => {
      localStorage.clear();
    });

    it("should set fighter", () => {
      const spyStorageService = spyOn(storageService, "removeItem");
      service.unSelectFighter();
      expect(spyStorageService).toHaveBeenCalledWith("fighter");
    });
  });
});
