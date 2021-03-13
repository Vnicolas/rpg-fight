import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PipesModule } from "app/shared/pipes/pipes.module";

import { CharacterInfosComponent } from "./character-infos.component";

describe("CharacterInfosComponent", () => {
  let component: CharacterInfosComponent;
  let fixture: ComponentFixture<CharacterInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipesModule],
      declarations: [CharacterInfosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("close()", () => {
    it("should emit closeEvent", () => {
      const spy = spyOn(component.closeEvent, "emit");
      component.close();
      expect(spy).toHaveBeenCalled();
    });
  });
});
