import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private backendUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error.error.message);
  }

  signup(name: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.backendUrl}users`, {name, password})
    .pipe(
      first(),
      catchError(this.handleError)
    );
  }

  signin(name: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.backendUrl}users/login`, {name, password})
    .pipe(
      first(),
      catchError(this.handleError)
    );
  }
}
