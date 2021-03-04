import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/services/storage.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user!: User;

  constructor(private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.storageService.getItem('account', true);
  }

  public createCharacter(): void {
    this.router.navigateByUrl('character');
  }

}
