import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/services/storage.service';
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

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private router: Router) {}

  ngOnInit(): void {
    const account: User = this.storageService.getItem('account', true);
    if (account) {
      this.goToDashboard();
    }
  }

  private goToDashboard(): void {
    this.router.navigateByUrl('/dashboard');
  }

  public signup(): void {
    this.errorMessage = '';
    if (!this.checkFields()) {
      return;
    }
    this.userService.signup(this.username, this.password).subscribe((user: User) => {
      this.storageService.setItem('account', user, true);
      this.goToDashboard();
    }, (error: string) => {
      this.errorMessage = error;
    });
  }

  public signin(): void {
    this.errorMessage = '';
    if (!this.checkFields()) {
      return;
    }
    this.userService.signin(this.username, this.password).subscribe((user: User) => {
      this.storageService.setItem('account', user, true);
      this.goToDashboard();
    }, (error: string) => {
      this.errorMessage = error;
    });
  }

  public checkFields(): boolean {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please fill all the fields';
      // TODO check in backend too
      return false;
    }
    return true;
  }

}
