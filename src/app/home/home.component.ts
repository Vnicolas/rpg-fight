import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';
import { StorageService } from 'src/services/storage.service';
import { User } from '../interfaces/user';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';

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
    library: FaIconLibrary,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router) {
      library.addIcons(faUser, faKey);
    }

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
    this.authService.signup(this.username, this.password).subscribe((user: User) => {
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
    this.authService.signin(this.username, this.password).subscribe((user: User) => {
      this.storageService.setItem('account', user, true);
      this.goToDashboard();
    }, (error: string) => {
      this.errorMessage = error;
    });
  }

  public checkFields(): boolean {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please fill all the fields';
      return false;
    }
    return true;
  }

}
