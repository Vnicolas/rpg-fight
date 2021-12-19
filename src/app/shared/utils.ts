import { HttpErrorResponse } from "@angular/common/http";
import { Character, CharacterStatus } from "app/interfaces/character.interface";
import { Observable, throwError } from "rxjs";

export function sortCharactersByAttribute(
  characters: Character[],
  property: string,
  ascOrder: boolean
): Character[] {
  if (property === "rank") {
    return characters.sort((characterA: Character, characterB: Character) => {
      if (ascOrder) {
        return characterA.rank - characterB.rank;
      }
      return characterB.rank - characterA.rank;
    });
  }
  if (property === "health") {
    return characters.sort((characterA: Character, characterB: Character) => {
      if (ascOrder) {
        return characterA.health - characterB.health;
      }
      return characterB.health - characterA.health;
    });
  }
  if (property === "attack") {
    return characters.sort((characterA: Character, characterB: Character) => {
      if (ascOrder) {
        return characterA.attack - characterB.attack;
      }
      return characterB.attack - characterA.attack;
    });
  }
  if (property === "defense") {
    return characters.sort((characterA: Character, characterB: Character) => {
      if (ascOrder) {
        return characterA.defense - characterB.defense;
      }
      return characterB.defense - characterA.defense;
    });
  }
  if (property === "magik") {
    return characters.sort((characterA: Character, characterB: Character) => {
      if (ascOrder) {
        return characterA.magik - characterB.magik;
      }
      return characterB.magik - characterA.magik;
    });
  }
  if (property === "skillPoints") {
    return characters.sort((characterA: Character, characterB: Character) => {
      if (ascOrder) {
        return characterA.skillPoints - characterB.skillPoints;
      }
      return characterB.skillPoints - characterA.skillPoints;
    });
  }
  if (property === "name") {
    return characters.sort((characterA: Character, characterB: Character) => {
      if (ascOrder) {
        return characterA.name.localeCompare(characterB.name);
      } else {
        return characterB.name.localeCompare(characterA.name);
      }
    });
  }

  return characters;
}

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
