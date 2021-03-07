import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { User } from '../interfaces/user';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/services/user.service';
import { Character } from '../interfaces/character';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public errorMessage = '';
  public user!: User;
  public newCharacterName = '';

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
    this.makeCharacterPicturesSafe();
  }

  private makeCharacterPicturesSafe(): void {
    this.user.characters.map((character: Character) => {
      character.pictureSafe = this.sanitizer.bypassSecurityTrustHtml(character.picture);
      return character;
    });
  }

  public signOut(): void {
    this.storageService.removeItem('account');
    this.router.navigateByUrl('/home');
  }

  public createCharacter(): void {
    if (!this.newCharacterName) {
      return;
    }

    this.userService.createUserCharacter(this.newCharacterName, this.user._id).subscribe((character: Character) => {
      character.pictureSafe = this.sanitizer.bypassSecurityTrustHtml(character.picture);
      this.user.characters.push(character);
      this.storageService.setItem('account', this.user, true);
    }, (error: string) => {
      this.errorMessage = error;
    });
  }

  public deleteCharacter(characterId: string): void {
    this.userService.deleteUserCharacter(characterId, this.user._id).subscribe((user: User) => {
      this.user = user;
      this.makeCharacterPicturesSafe();
      this.storageService.setItem('account', this.user, true);
    }, (error: string) => {
      this.errorMessage = error;
    });
  }



}
