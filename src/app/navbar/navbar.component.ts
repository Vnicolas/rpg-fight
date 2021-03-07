import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/services/auth/auth.service';
import { UserService } from 'src/services/user.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UserService) { }

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
