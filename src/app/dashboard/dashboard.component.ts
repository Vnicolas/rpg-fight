import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/services/storage.service';
import { User } from '../interfaces/user';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UserService } from 'src/services/user.service';
import { Character } from '../interfaces/character';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public errorMessage = '';
  public user!: User;
  public newCharacterName = '';
  public svg: SafeHtml = '';

  constructor(
    private storageService: StorageService,
    private sanitizer: DomSanitizer,
    private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.storageService.getItem('account', true);
    this.user.characters.map((character: Character) => {
      character.pictureSafe = this.sanitizer.bypassSecurityTrustHtml(character.picture);
      return character;
    });
  }

  public createCharacter(): void {
    if (!this.newCharacterName) {
      return;
    }

    this.userService.createCharacter(this.newCharacterName, this.user.id).subscribe((character: Character) => {
      character.pictureSafe = this.sanitizer.bypassSecurityTrustHtml(character.picture);
      this.user.characters.push(character);
      this.storageService.setItem('account', this.user, true);
    }, (error: string) => {
      this.errorMessage = error;
    });
  }

}
