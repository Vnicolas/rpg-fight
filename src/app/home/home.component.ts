import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public username = '';
  public password = '';
  public errorMessage = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
  }

  public signup(): void {
    this.errorMessage = '';
    this.userService.signup(this.username, this.password).subscribe((user: User) => {
      console.log('signup Success !');
    }, (error: string) => {
      this.errorMessage = error;
    });
  }

  public signin(): void {
    this.errorMessage = '';
    this.userService.signin(this.username, this.password).subscribe((user: User) => {
      console.log('signin Success !');
    }, (error: string) => {
      this.errorMessage = error;
    });
  }

}
