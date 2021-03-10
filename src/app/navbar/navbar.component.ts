import { Component, OnInit } from "@angular/core";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { first } from "rxjs/operators";
import { AuthService } from "services/auth.service";
import { UserService } from "services/user.service";
import { User } from "../interfaces/user";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(
    library: FaIconLibrary,
    private authService: AuthService,
    private userService: UserService
  ) {
    library.addIcons(faSignOutAlt);
  }

  public user!: User;

  ngOnInit(): void {
    this.userService.user.pipe(first()).subscribe((user: User) => {
      this.user = user;
    });
  }

  public signOut(): void {
    this.authService.logout();
  }
}
