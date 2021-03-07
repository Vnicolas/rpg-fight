import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterInfosComponent } from './character-infos.component';

describe('CharacterInfosComponent', () => {
  let component: CharacterInfosComponent;
  let fixture: ComponentFixture<CharacterInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterInfosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
