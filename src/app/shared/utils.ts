import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export function handleHttpErrors(error: HttpErrorResponse): Observable<never> {
  return throwError(error.error.message);
}

export enum CharacterStatus {
  IN_FIGHT = 'InFight',
  AVAILABLE = 'Available',
  RESTING = 'Resting ',
}
