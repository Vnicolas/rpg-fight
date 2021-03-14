import { TestBed } from "@angular/core/testing";
import { ActivatedRouteSnapshot } from "@angular/router";
import { CharactersService } from "app/services/characters.service";
import { of } from "rxjs";

import { FightsResolver } from "./fights.resolver";

describe("FightsResolver", () => {
  let resolver: FightsResolver;

  let charactersService: CharactersService;
  let route: ActivatedRouteSnapshot;
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
          provide: CharactersService,
          useValue: {
            getFights: jest.fn(),
          },
        },
      ],
    });

    resolver = TestBed.inject(FightsResolver);
    charactersService = TestBed.inject(CharactersService);
    route = TestBed.inject(ActivatedRouteSnapshot);
  });

  it("should be created", () => {
    expect(resolver).toBeTruthy();
  });

  describe("resolve()", () => {
    it("should return fights if found", async () => {
      spyOn(charactersService, "getFights").and.returnValue(of([]));
      route.params.id = "1";
      const test = await resolver.resolve(route);
      expect(test).toEqual([]);
    });

    it("should return undefined if found", async () => {
      spyOn(charactersService, "getFights").and.returnValue(of(undefined));
      route.params.id = "1";
      try {
        await resolver.resolve(route);
      } catch (error) {
        expect(error).toEqual(undefined);
      }
    });
  });
});
