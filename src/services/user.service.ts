import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Character } from 'src/app/interfaces/character';
import { handleHttpErrors } from 'src/app/shared/utils';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {}

  createUserCharacter(name: string, owner: string): Observable<Character> {
    const url = `${environment.backendUrl}users/${owner}/characters`;
    return this.http.post<Character>(url, {name, owner})
    .pipe(
      first(),
      catchError(handleHttpErrors)
    );
  }
}
