import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Character } from 'app/interfaces/character';
import { handleHttpErrors, Point } from 'app/shared/utils';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {

  constructor(private http: HttpClient) {}

  updatePoints(characterId: string, points: Point): Observable<Character> {
    const url = `${environment.backendUrl}characters/${characterId}`;
    return this.http.patch<Character>(url, points)
    .pipe(
      first(),
      catchError(handleHttpErrors)
    );
  }
}
