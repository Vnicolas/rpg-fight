import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

export function handleHttpErrors(error: HttpErrorResponse): Observable<never> {
  return throwError(error.error.message);
}

export const enum CharacterStatus {
  NOT_READY = "Not Ready",
  READY = "Ready",
  IN_FIGHT = "In Fight",
  RESTING = "Resting",
}

export const enum CharacterFightProperty {
  HEALTH = "health",
  ATTAK = "attack",
  DEFENSE = "defense",
  MAGIK = "magik",
}

export interface Points {
  initialPoints: number;
  finalPoints: number;
  costs: number[];
}

export interface Skills {
  [key: string]: Points;
}

export interface Point {
  [key: string]: number;
}

export interface PointsCost {
  [key: string]: number[];
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
