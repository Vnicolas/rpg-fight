import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Character } from "../../interfaces/character.interface";

@Component({
  selector: "app-character-delete-modal",
  templateUrl: "./character-delete-modal.component.html",
  styleUrls: ["./character-delete-modal.component.scss"],
})
export class CharacterDeleteModalComponent {
  @Input()
  isActive = false;

  @Input()
  character!: Character;

  @Output()
  closeEvent = new EventEmitter<void>();

  @Output()
  confirmEvent = new EventEmitter<void>();

  constructor() {}

  close(): void {
    this.closeEvent.emit();
  }

  confirm(): void {
    this.confirmEvent.emit();
  }
}
