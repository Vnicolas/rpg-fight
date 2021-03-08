import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export function handleHttpErrors(error: HttpErrorResponse): Observable<never> {
  return throwError(error.error.message);
}

export const enum CharacterStatus {
  IN_FIGHT = 'In Fight',
  AVAILABLE = 'Available',
  RESTING = 'Resting',
}

export const enum CharacterFightProperty {
  HEALTH = 'health',
  ATTAK = 'attack',
  DEFENSE = 'defense',
  MAGIK = 'magik',
}

export function getStatusClass(characterStatus: string): string {
  let classToReturn = '';
  switch (characterStatus) {
    case undefined:
      classToReturn = 'is-white';
      break;
    case CharacterStatus.AVAILABLE:
      classToReturn = 'is-success';
      break;
    case CharacterStatus.IN_FIGHT:
      classToReturn = 'is-warning';
      break;
    case CharacterStatus.RESTING:
      classToReturn = 'is-light';
      break;
    default:
      break;
  }
  return classToReturn;
}
