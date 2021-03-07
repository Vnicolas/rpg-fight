import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Character } from '../interfaces/character';
import { getStatusClass } from '../shared/utils';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTimes, faIdCard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {

  @Input()
  characters: Character[] = [];

  @Output()
  deleteEvent = new EventEmitter<string>();

  @Output()
  viewEvent = new EventEmitter<string>();

  constructor(library: FaIconLibrary) {
    library.addIcons(faTimes, faIdCard);
  }

  ngOnInit(): void {
  }

  public getStatusClass(characterStatus: string): any {
    return getStatusClass(characterStatus);
  }

  public deleteCharacter(characterId: string): void {
    this.deleteEvent.emit(characterId);
  }

  public viewCharacter(characterId: string): void {
    this.viewEvent.emit(characterId);
  }
}
