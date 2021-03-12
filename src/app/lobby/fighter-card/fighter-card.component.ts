import { Component, Input, OnInit } from "@angular/core";
import { Character } from "app/interfaces/character";

@Component({
  selector: "app-fighter-card",
  templateUrl: "./fighter-card.component.html",
  styleUrls: ["./fighter-card.component.scss"],
})
export class FighterCardComponent implements OnInit {
  @Input()
  fighter!: Character;

  @Input()
  ownerName!: string;

  @Input()
  turnAttackResult?: any;

  @Input()
  turnDiceResult?: any;

  constructor() {}

  ngOnInit(): void {}
}
