import { TestBed } from '@angular/core/testing';

import { CharacterResolver } from './character.resolver';

describe('CharacterResolver', () => {
  let resolver: CharacterResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CharacterResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
