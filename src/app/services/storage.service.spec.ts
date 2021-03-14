import { TestBed } from "@angular/core/testing";
import { StorageService } from "./storage.service";

describe("StorageService", () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("getItem()", () => {
    afterEach(() => {
      localStorage.clear();
    });

    it("should return desired item", () => {
      localStorage.setItem("test", "testValue");
      const item = service.getItem("test");
      expect(item).toEqual("testValue");
    });

    it("should return desired item", () => {
      localStorage.setItem("test", JSON.stringify({ name: "testValue" }));
      const item = service.getItem("test", true);
      expect(item).toEqual({ name: "testValue" });
    });
  });

  describe("setItem()", () => {
    afterEach(() => {
      localStorage.clear();
    });

    it("should return set item", () => {
      service.setItem("test", "testValue");
      const item = localStorage.getItem("test");
      expect(item).toEqual("testValue");
    });

    it("should return set stringified item", () => {
      service.setItem("test", { name: "testValue" }, true);
      const item = JSON.parse(localStorage.getItem("test") as string);
      expect(item).toEqual({ name: "testValue" });
    });
  });

  describe("removeItem()", () => {
    afterEach(() => {
      localStorage.clear();
    });

    it("should remove item", () => {
      localStorage.setItem("test", "testValue");
      service.removeItem("test");
      const item = localStorage.getItem("test");
      expect(item).toBeUndefined();
    });
  });
});
