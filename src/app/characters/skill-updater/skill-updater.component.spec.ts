import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IconsModule } from "app/icons.module";

import { SkillUpdaterComponent } from "./skill-updater.component";

describe("SkillUpdaterComponent", () => {
  let component: SkillUpdaterComponent;
  let fixture: ComponentFixture<SkillUpdaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsModule],
      declarations: [SkillUpdaterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillUpdaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("addPoint()", () => {
    it("should emit event", () => {
      const spy = spyOn(component.addPoints, "emit");
      component.addPoint();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("removePoint()", () => {
    it("should emit event", () => {
      const spy = spyOn(component.removePoints, "emit");
      component.removePoint();
      expect(spy).toHaveBeenCalled();
    });
  });
});
