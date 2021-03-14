import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IconsModule } from "app/icons.module";
import { PipesModule } from "app/shared/pipes/pipes.module";
import { FighterCardComponent } from "./fighter-card.component";

jest.useFakeTimers();
describe("FighterCardComponent", () => {
  let component: FighterCardComponent;
  let fixture: ComponentFixture<FighterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsModule, PipesModule],
      declarations: [FighterCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FighterCardComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnChanges()", () => {
    it("should set shake to TRUE when attack succeed, then FALSE", () => {
      component.turnAttackResult = {
        result: 1,
      };
      component.ngOnChanges();
      expect(component.shake).toEqual(true);
      jest.advanceTimersByTime((component as any).changeClassDelay + 1000);
      expect(component.shake).toEqual(false);
    });

    it("should set shake to FALSE when attack failed", () => {
      component.turnAttackResult = {
        result: 0,
      };
      component.ngOnChanges();
      expect(component.shake).toEqual(false);
    });
  });
});
