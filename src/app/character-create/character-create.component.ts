import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { Character } from '../interfaces/character';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-character-create',
  templateUrl: './character-create.component.html',
  styleUrls: ['./character-create.component.scss']
})
export class CharacterCreateComponent implements OnInit {

  public errorMessage = '';
  public newCharacterName = '';

  @Input()
  userId!: string;

  @Input()
  charactersLength!: number;

  @Output()
  characterCreated = new EventEmitter<Character>();

  constructor(
    private userService: UserService,
    library: FaIconLibrary
    ) {
    library.addIcons(faPlus);
  }

  ngOnInit(): void {
  }

  public createCharacter(): void {
    this.errorMessage = '';
    if (!this.newCharacterName) {
      this.errorMessage = 'Please give a name';
      return;
    }

    this.userService.createUserCharacter(this.newCharacterName, this.userId).subscribe((character: Character) => {
      this.characterCreated.emit(character);
      this.newCharacterName = '';
    }, (error: string) => {
      this.errorMessage = error;
    });
  }
}
