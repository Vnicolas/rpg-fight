import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "app/services/user.service";
import { Subscription } from "rxjs";
import { Character } from "../../interfaces/character.interface";
import { User } from "../../interfaces/user";

@Component({
  selector: "app-characters-list-container",
  templateUrl: "./characters-list-container.component.html",
  styleUrls: ["./characters-list-container.component.scss"],
})
export class CharactersListContainerComponent implements OnInit, OnDestroy {
  public user!: User;
  private subscriptions = new Subscription();

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.userService.user.subscribe((user: User) => {
        this.user = user;
      })
    );

    this.subscriptions.add(
      this.route.queryParams.subscribe(async (params) => {
        if (params.refresh !== "true" || !this.user) {
          return;
        }
        try {
          const characters = await this.userService
            .getUserCharacters(this.user._id)
            .toPromise();
          this.user.characters = characters;
          this.userService.updateUser(this.user);
        } catch (error) {
          console.error(error);
        }
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
