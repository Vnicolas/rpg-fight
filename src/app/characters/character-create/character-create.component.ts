import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnDestroy,
} from "@angular/core";
import { UserService } from "services/user.service";
import { Character } from "../../interfaces/character";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Subscription } from "rxjs";

@Component({
  selector: "app-character-create",
  templateUrl: "./character-create.component.html",
  styleUrls: ["./character-create.component.scss"],
})
export class CharacterCreateComponent implements OnDestroy {
  public errorMessage = "";
  public newCharacterName = "";
  private subscriptions = new Subscription();

  @Input()
  userId!: string;

  @Input()
  charactersLength!: number;

  @Output()
  characterCreated = new EventEmitter<Character>();

  constructor(private userService: UserService, library: FaIconLibrary) {
    library.addIcons(faPlus);
  }

  public createCharacter(): void {
    this.errorMessage = "";
    if (!this.newCharacterName) {
      this.errorMessage = "Please give a name";
      return;
    }

    this.subscriptions.add(
      this.userService
        .createUserCharacter(this.newCharacterName, this.userId)
        .subscribe(
          (character: Character) => {
            this.characterCreated.emit(character);
            this.newCharacterName = "";
          },
          (error: string) => {
            this.errorMessage = error;
          }
        )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
