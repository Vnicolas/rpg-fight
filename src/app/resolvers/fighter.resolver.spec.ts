import { TestBed } from "@angular/core/testing";
import { StorageService } from "app/services/storage.service";
import { FighterResolver } from "./fighter.resolver";

describe("FighterResolver", () => {
  let resolver: FighterResolver;

  let storageService: StorageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StorageService,
          useValue: {
            getItem: jest.fn(),
          },
        },
      ],
    });

    storageService = TestBed.inject(StorageService);
    resolver = TestBed.inject(FighterResolver);
  });

  it("should be created", () => {
    expect(resolver).toBeTruthy();
  });

  describe("resolve()", () => {
    it("should return one if fighter found", async () => {
      const expected = {
        user: {
          name: "userName",
        },
        fighter: {
          name: "fighterName",
        },
      };
      spyOn(storageService, "getItem").and.returnValues(
        expected.fighter,
        expected.user
      );
      const test = await resolver.resolve();
      expect(test).toEqual(expected);
    });

    it("should return undefined if fighter not found", async () => {
      const expected = {
        user: {
          name: "userName",
        },
      };
      spyOn(storageService, "getItem").and.returnValues(
        undefined,
        expected.user
      );
      try {
        await resolver.resolve();
      } catch (error) {
        expect(error).toEqual(undefined);
      }
    });

    it("should return undefined if user not found", async () => {
      const expected = {
        fighter: {
          name: "fighterName",
        },
      };
      spyOn(storageService, "getItem").and.returnValues(
        expected.fighter,
        undefined
      );
      try {
        await resolver.resolve();
      } catch (error) {
        expect(error).toEqual(undefined);
      }
    });
  });
});
