import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { handleHttpErrors } from 'src/app/shared/utils';
import { StorageService } from '../storage.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, public storageService: StorageService) {}

  public isAuthenticated(): boolean {
    const token = this.storageService.getItem('account', true);
    return !!token;
  }

  signup(name: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.backendUrl}users`, {name, password})
    .pipe(
      first(),
      catchError(handleHttpErrors)
    );
  }

  signin(name: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.backendUrl}users/login`, {name, password})
    .pipe(
      first(),
      catchError(handleHttpErrors)
    );
  }
}
