import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Character } from 'src/app/interfaces/character';
import { handleHttpErrors } from 'src/app/shared/utils';
import { environment } from '../environments/environment';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {}

  createUserCharacter(name: string, owner: string): Observable<Character> {
    const url = `${environment.backendUrl}users/${owner}/characters`;
    return this.http.post<Character>(url, {name})
    .pipe(
      first(),
      catchError(handleHttpErrors)
    );
  }

  deleteUserCharacter(characterId: string, owner: string): Observable<User> {
    const url = `${environment.backendUrl}users/${owner}/characters/${characterId}`;
    return this.http.delete<User>(url)
    .pipe(
      first(),
      catchError(handleHttpErrors)
    );
  }
}
