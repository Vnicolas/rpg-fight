import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { User } from '../interfaces/user';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/services/user.service';
import { Character } from '../interfaces/character';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getStatusClass } from '../shared/utils';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public errorMessage = '';
  public user!: User;
  public newCharacterName = '';
  public characterSelected!: Character;
  public isCharacterModalActive = false;

  constructor(
    library: FaIconLibrary,
    private storageService: StorageService,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private router: Router) {
      library.addIcons(faPlus);
    }

  ngOnInit(): void {
    this.user = this.storageService.getItem('account', true);
    this.setCharacterDisplayInformations();
  }

  private setCharacterDisplayInformations(): void {
    this.user.characters.map((character: Character) => {
      character.pictureSafe = this.sanitizer.bypassSecurityTrustHtml(character.picture);
      character.statusClass = getStatusClass(character.status);
      return character;
    });
  }

  public signOut(): void {
    this.storageService.removeItem('account');
    this.router.navigateByUrl('/home');
  }

  public createCharacter(): void {
    this.errorMessage = '';
    if (!this.newCharacterName) {
      this.errorMessage = 'Please give a name';
      return;
    }

    this.userService.createUserCharacter(this.newCharacterName, this.user._id).subscribe((character: Character) => {
      character.pictureSafe = this.sanitizer.bypassSecurityTrustHtml(character.picture);
      this.user.characters.push(character);
      this.storageService.setItem('account', this.user, true);
      this.newCharacterName = '';
    }, (error: string) => {
      this.errorMessage = error;
    });
  }

  public deleteCharacter(characterId: string): void {
    this.errorMessage = '';
    this.userService.deleteUserCharacter(characterId, this.user._id).subscribe((user: User) => {
      this.user = user;
      this.setCharacterDisplayInformations();
      this.storageService.setItem('account', this.user, true);
    }, (error: string) => {
      this.errorMessage = error;
    });
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

}
