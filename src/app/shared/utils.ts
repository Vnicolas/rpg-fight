import { HttpErrorResponse } from "@angular/common/http";
import { CharacterStatus } from "app/interfaces/character.interface";
import { Observable, throwError } from "rxjs";

export function handleHttpErrors(error: HttpErrorResponse): Observable<never> {
  return throwError(error.error.message);
}

export const enum WON_OR_LOOSE {
  WON = "Won",
  LOOSE = "Loose",
}

export function getDivided(amount: number): number {
  return Math.ceil(amount / 5);
}

export function getStatusClass(characterStatus: string): string {
  let classToReturn = "";
  switch (characterStatus) {
    case undefined:
      classToReturn = "is-white";
      break;
    case CharacterStatus.NOT_READY:
      classToReturn = "is-dark";
      break;
    case CharacterStatus.READY:
      classToReturn = "is-success";
      break;
    case CharacterStatus.IN_FIGHT:
      classToReturn = "is-warning";
      break;
    case CharacterStatus.RESTING:
      classToReturn = "is-light";
      break;
    default:
      break;
  }
  return classToReturn;
}

export function getFightStatusClass(fightStatus: string): string {
  let classToReturn = "";
  switch (fightStatus) {
    case undefined:
      classToReturn = "";
      break;
    case WON_OR_LOOSE.WON:
      classToReturn = "is-success";
      break;
    case WON_OR_LOOSE.LOOSE:
      classToReturn = "is-danger";
      break;
    default:
      break;
  }
  return classToReturn;
}

export const dateOptions: any = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};
