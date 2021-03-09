import { Component, Input, OnDestroy } from '@angular/core';
import { Character } from '../../interfaces/character';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTimes, faIdCard, faCheckCircle, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../interfaces/user';
import { UserService } from 'services/user.service';
import { Subscription } from 'rxjs';
import { CharactersService } from 'services/characters.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnDestroy {

  public errorMessage = '';
  public newCharacterName = '';
  public characterSelected!: Character;
  public fighterSelected!: Character;
  public isCharacterModalActive = false;
  private subscriptions = new Subscription();

  @Input()
  user!: User;

  constructor(
    library: FaIconLibrary,
    private userService: UserService,
    private characterService: CharactersService) {
    library.addIcons(faTimes, faIdCard, faCheckCircle, faDotCircle);
  }

  public deleteCharacter(characterId: string): void {
    this.errorMessage = '';
    this.subscriptions.add(
      this.userService.deleteUserCharacter(characterId, this.user._id).subscribe((user: User) => {
        this.userService.updateUser(user);
      }, (error: string) => {
        this.errorMessage = error;
      })
    );
  }

  public viewCharacter(characterId: string): void {
    this.errorMessage = '';
    const characterSelected = this.user.characters.find((character: Character) => character._id === characterId);
    if (!characterSelected) {
      this.errorMessage = 'This character does not exist !';
      return;
    }
    this.characterSelected = characterSelected;
    this.isCharacterModalActive = true;
  }

  public select(character: Character): void {
    if (this.fighterSelected?._id === character._id) {
      this.fighterSelected = undefined as unknown as Character;
      this.characterService.unSelectFighter();
      return;
    }
    this.fighterSelected = character;
    this.characterService.selectFighter(character);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
