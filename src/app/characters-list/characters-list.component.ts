import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../interfaces/character';
import { CharacterStatus } from '../shared/utils';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {

  @Input()
  characters: Character[] = [];

  constructor(library: FaIconLibrary) {
    library.addIcons(faTimes);
  }

  ngOnInit(): void {
  }

  public getStatusClass(characterStatus: string): any{
    if (!characterStatus) {
      return {
        tag: true,
        'is-white': true
      }
    }
    return {
      tag: true,
      'is-success': characterStatus === CharacterStatus.AVAILABLE,
      'is-warning': characterStatus === CharacterStatus.IN_FIGHT,
      'is-light': characterStatus === CharacterStatus.RESTING
    };
  }

}
