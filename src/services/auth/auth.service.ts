// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';

@Injectable()
export class AuthService {

  constructor(public storageService: StorageService) {}

  public isAuthenticated(): boolean {
    const token = this.storageService.getItem('account', true);
    return !!token;
  }
}
