import { TestBed } from "@angular/core/testing";
import { SkillsService } from "./skills.service";

describe("SkillsService", () => {
  let service: SkillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("canRemovePoints()", () => {
    it("should return TRUE if possible", () => {
      const initialPoints = 1;
      const amount = 2;
      const test = service.canRemovePoints(initialPoints, amount);
      expect(test).toEqual(true);
    });

    it("should return FALSE if not possible", () => {
      const initialPoints = 10;
      const amount = 1;
      const test = service.canRemovePoints(initialPoints, amount);
      expect(test).toEqual(false);
    });
  });

  describe("canAddPoints()", () => {
    it("should return TRUE if possible", () => {
      const amount = 6;
      const test = service.canAddPoints(amount);
      expect(test).toEqual(true);
    });

    it("should return FALSE if not possible", () => {
      const amount = 0;
      const test = service.canAddPoints(amount);
      expect(test).toEqual(false);
    });
  });

  describe("getDivided()", () => {
    it("should return amount devided by 5", () => {
      const amount = 6;
      const test = service.getDivided(amount);
      expect(test).toEqual(2);
    });
  });
});
