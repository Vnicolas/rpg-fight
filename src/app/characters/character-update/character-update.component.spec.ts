import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CharacterUpdateComponent } from "./character-update.component";

describe("CharacterUpdateComponent", () => {
  let component: CharacterUpdateComponent;
  let fixture: ComponentFixture<CharacterUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterUpdateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
