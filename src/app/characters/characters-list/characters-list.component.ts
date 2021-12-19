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
} from "@fortawesome/free-solid-svg-icons";
import { User } from "../../interfaces/user";
import { Subscription } from "rxjs";
import { UserService } from "app/services/user.service";
import { CharactersService } from "app/services/characters.service";

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
  private subscriptions = new Subscription();

  @Input()
  user!: User;

  constructor(
    library: FaIconLibrary,
    private userService: UserService,
    private charactersService: CharactersService
  ) {
    library.addIcons(faTimes, faIdCard, faCheckCircle, faDotCircle, faCrown);
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
    });
    Promise.all(promises)
      .catch((err) => {
        this.errorMessage = err;
      })
      .then(() => {
        this.userService.updateUser(this.user);
      });
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
