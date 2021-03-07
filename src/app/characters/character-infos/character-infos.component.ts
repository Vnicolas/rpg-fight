import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Character } from '../../interfaces/character';

@Component({
  selector: 'app-character-infos',
  templateUrl: './character-infos.component.html',
  styleUrls: ['./character-infos.component.scss']
})
export class CharacterInfosComponent implements OnInit {

  @Input()
  isActive = false;

  @Input()
  character!: Character;

  @Output()
  closeEvent = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  close(): void {
    this.closeEvent.emit();
  }
}