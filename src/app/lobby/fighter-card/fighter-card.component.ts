import { Component, Input, OnChanges } from "@angular/core";
import { Character } from "app/interfaces/character.interface";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-fighter-card",
  templateUrl: "./fighter-card.component.html",
  styleUrls: ["./fighter-card.component.scss"],
})
export class FighterCardComponent implements OnChanges {
  private CHANGE_CLASS_DELAY = 850; // in ms, correspond to css animation delay

  @Input()
  fighter!: Character;

  @Input()
  ownerName!: string;

  @Input()
  turnAttackResult?: any;

  @Input()
  turnDiceResult?: any;

  @Input()
  isWinner = true;

  public shake = false;

  constructor(library: FaIconLibrary) {
    library.addIcons(faCrown);
  }

  ngOnChanges(): void {
    if (this.turnAttackResult && this.turnAttackResult.result > 0) {
      this.shake = true;
      setTimeout(() => {
        this.shake = false;
      }, this.CHANGE_CLASS_DELAY);
    } else {
      this.shake = false;
    }
  }
}
