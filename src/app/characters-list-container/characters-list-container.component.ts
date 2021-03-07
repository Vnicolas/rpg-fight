import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { Character } from '../interfaces/character';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-characters-list-container',
  templateUrl: './characters-list-container.component.html',
  styleUrls: ['./characters-list-container.component.scss']
})
export class CharactersListContainerComponent implements OnInit {

  public user!: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user.subscribe((user: User) => {
      this.user = user;
    });
  }

  updateUser(character: Character): void {
    this.user.characters.push(character);
    this.userService.updateUser(this.user);
  }
}
