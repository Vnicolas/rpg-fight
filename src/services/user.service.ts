import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Character } from 'src/app/interfaces/character';
import { backendUrl, handleHttpErrors } from 'src/app/shared/utils';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {}

  createUserCharacter(name: string, owner: string): Observable<Character> {
    const url = `${backendUrl}users/${owner}/characters`;
    return this.http.post<Character>(url, {name, owner})
    .pipe(
      first(),
      catchError(handleHttpErrors)
    );
  }
}
