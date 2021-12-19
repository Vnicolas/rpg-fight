import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import {
  Character,
  CharacterStatus,
} from "../../interfaces/character.interface";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import {
  faTimes,
  faIdCard,
  faCheckCircle,
  faDotCircle,
  faCrown,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { User } from "../../interfaces/user";
import { Subscription } from "rxjs";
import { UserService } from "app/services/user.service";
import { CharactersService } from "app/services/characters.service";
import { sortCharactersByAttribute } from "app/shared/utils";

@Component({
  selector: "app-characters-list",
  templateUrl: "./characters-list.component.html",
  styleUrls: ["./characters-list.component.scss"],
})
export class CharactersListComponent implements OnInit, OnDestroy {
  public errorMessage = "";
  public newCharacterName = "";
  public characterToDelete!: Character;
  public fighterSelected!: Character;
  public isCharacterModalActive = false;
  public isCharacterToDeleteModalActive = false;
  public isSorted = false;
  private subscriptions = new Subscription();

  public sorts: Record<string, Record<string, boolean>> = {
    rank: {
      asc: true,
      sorted: false,
    },
    name: {
      asc: true,
      sorted: false,
    },
    health: {
      asc: false,
      sorted: false,
    },
    attack: {
      asc: false,
      sorted: false,
    },
    defense: {
      asc: false,
      sorted: false,
    },
    magik: {
      asc: false,
      sorted: false,
    },
    skillPoints: {
      asc: false,
      sorted: false,
    },
  };

  @Input()
  user!: User;

  constructor(
    library: FaIconLibrary,
    private userService: UserService,
    private charactersService: CharactersService
  ) {
    library.addIcons(
      faTimes,
      faIdCard,
      faCheckCircle,
      faDotCircle,
      faCrown,
      faSortDown,
      faSortUp
    );
  }

  ngOnInit(): void {
    this.fighterSelected = this.charactersService.getFighter();
    const today = new Date().getTime();
    if (!this.user) {
      return;
    }
    const promises: Promise<Character>[] = [];
    this.user.characters.forEach((character: Character) => {
      const isCharacterResting = character.status === CharacterStatus.RESTING;
      character = this.checkRest(character, today);
      if (isCharacterResting && !character.restEndDate) {
        character.status = CharacterStatus.READY;
        promises.push(
          this.charactersService
            .updateCharacter(character._id, character)
            .toPromise()
        );
      }
      this.sortCharacters("rank");
    });
    Promise.all(promises)
      .catch((err) => {
        this.errorMessage = err;
      })
      .then(() => {
        this.userService.updateUser(this.user);
      });
  }

  public sortCharacters(property: string): void {
    this.user.characters = sortCharactersByAttribute(
      this.user.characters,
      property,
      this.sorts[property].asc
    );
    this.sorts[property].asc = !this.sorts[property].asc;
    for (const sortProperty in this.sorts) {
      if (this.sorts[sortProperty]) {
        this.sorts[sortProperty].sorted = false;
      }
    }
    this.sorts[property].sorted = true;
  }

  public openModaleDeleteCharacter(character: Character): void {
    this.characterToDelete = character;
    this.isCharacterToDeleteModalActive = true;
  }

  public deleteCharacter(): void {
    this.errorMessage = "";
    this.subscriptions.add(
      this.userService
        .deleteUserCharacter(this.characterToDelete._id, this.user._id)
        .subscribe(
          (user: User) => {
            this.userService.updateUser(user);
            this.characterToDelete = undefined as unknown as Character;
            this.isCharacterToDeleteModalActive = false;
          },
          (error: string) => {
            this.errorMessage = error;
          }
        )
    );
  }

  public select(character: Character): void {
    if (this.fighterSelected?._id === character._id) {
      this.fighterSelected = undefined as unknown as Character;
      this.charactersService.unSelectFighter();
      return;
    }
    this.fighterSelected = character;
    this.charactersService.selectFighter(character);
  }

  public getResting(characterRestingTime: number): string {
    const timeBeforeReady = new Date(characterRestingTime).toLocaleString(
      "en-US"
    );
    return `Ready at ${timeBeforeReady}`;
  }

  private checkRest(character: Character, todayTime: number): Character {
    if (character.restEndDate && character.restEndDate <= todayTime) {
      character.restEndDate = undefined;
    }
    return character;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
