import { TestBed } from "@angular/core/testing";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Character } from "app/interfaces/character.interface";
import { UserService } from "app/services/user.service";
import { of } from "rxjs";

import { CharacterResolver } from "./character.resolver";

describe("CharacterResolver", () => {
  let resolver: CharacterResolver;

  let userService: UserService;
  let route: ActivatedRouteSnapshot;
  const userSaved = {
    _id: "1",
    name: "john",
    characters: [{ _id: "1" } as Character],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRouteSnapshot,
          useValue: {
            params: {},
          },
        },
        {
          provide: UserService,
          useValue: {
            updateUser: jest.fn(),
            user: {
              pipe: jest.fn(),
            },
          },
        },
      ],
    });

    userService = TestBed.inject(UserService);
    route = TestBed.inject(ActivatedRouteSnapshot);
    resolver = TestBed.inject(CharacterResolver);
  });

  it("should be created", () => {
    expect(resolver).toBeTruthy();
  });

  describe("resolve()", () => {
    it("should return one if character found in user account", async () => {
      spyOn(userService.user, "pipe").and.returnValue(of(userSaved));
      route.params.id = "1";
      const test = await resolver.resolve(route);
      expect(test).toEqual({ _id: "1" } as Character);
    });

    it("should return undefined if character not found in user account", async () => {
      spyOn(userService.user, "pipe").and.returnValue(of(userSaved));
      route.params.id = "2";
      try {
        await resolver.resolve(route);
      } catch (error) {
        expect(error).toEqual(undefined);
      }
    });
  });
});
