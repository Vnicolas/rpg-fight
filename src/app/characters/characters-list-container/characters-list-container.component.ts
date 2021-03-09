import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/services/user.service';
import { Character } from '../../interfaces/character';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-characters-list-container',
  templateUrl: './characters-list-container.component.html',
  styleUrls: ['./characters-list-container.component.scss']
})
export class CharactersListContainerComponent implements OnInit, OnDestroy {

  public user!: User;
  private subscriptions = new Subscription();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.userService.user.subscribe((user: User) => {
        this.user = user;
      })
    );
  }

  public updateUser(character: Character): void {
    this.user.characters.push(character);
    this.userService.updateUser(this.user);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
