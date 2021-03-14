import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";
import { Fight } from "app/interfaces/fight.interface";
import { first } from "rxjs/operators";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Character } from "app/interfaces/character.interface";
import {
  dateOptions,
  getFightStatusClass,
  WON_OR_LOOSE,
} from "app/shared/utils";

@Component({
  selector: "app-fights",
  templateUrl: "./fights.component.html",
  styleUrls: ["./fights.component.scss"],
})
export class FightsComponent implements OnInit {
  public fights!: any[];
  public character!: Character;

  constructor(library: FaIconLibrary, private route: ActivatedRoute) {
    library.addIcons(faArrowLeft);
  }

  ngOnInit(): void {
    this.route.data.pipe(first()).subscribe((data: Data) => {
      this.character = data.character;
      this.fights = data.fights.map((fight: Fight) =>
        this.getFightResult(fight, this.character._id)
      );
    });
  }

  private getFightResult(fight: Fight, characterId: string): any {
    let fightOpponentLabel = `@${fight.looserOwnerName} / ${fight.looserName}`;
    if (fight.looserId === characterId) {
      fightOpponentLabel = `@${fight.winnerOwnerName} / ${fight.winnerName}`;
    }

    let winOrLoose = WON_OR_LOOSE.WON;
    if (fight.looserId === characterId) {
      winOrLoose = WON_OR_LOOSE.LOOSE;
    }
    const eventDate = new Date(fight.createdAt);
    const eventDateFormated = eventDate.toLocaleDateString(
      undefined,
      dateOptions
    );
    return {
      fightOpponentLabel,
      winOrLoose,
      tagClass: getFightStatusClass(winOrLoose),
      turns: fight.turns.length,
      createdAt: eventDateFormated,
    };
  }
}
