import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SkillUpdaterComponent } from "./skill-updater.component";

describe("SkillUpdaterComponent", () => {
  let component: SkillUpdaterComponent;
  let fixture: ComponentFixture<SkillUpdaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
});
