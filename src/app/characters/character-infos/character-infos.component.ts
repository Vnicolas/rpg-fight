import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../../interfaces/character';

@Component({
  selector: 'app-character-infos',
  templateUrl: './character-infos.component.html',
  styleUrls: ['./character-infos.component.scss']
})
export class CharacterInfosComponent {

  @Input()
  isActive = false;

  @Input()
  character!: Character;

  @Output()
  closeEvent = new EventEmitter<void>();

  constructor() {}

  close(): void {
    this.closeEvent.emit();
  }
}
