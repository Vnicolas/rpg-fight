import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Character } from 'src/app/interfaces/character';
import { handleHttpErrors, Points } from 'src/app/shared/utils';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {

  constructor(private http: HttpClient) {}

  updatePoints(characterId: string, changes: Points): Observable<Character> {
    const url = `${environment.backendUrl}characters/${characterId}`;
    return this.http.patch<Character>(url, changes)
    .pipe(
      first(),
      catchError(handleHttpErrors)
    );
  }
}
