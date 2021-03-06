import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, first } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Character, Point } from "app/interfaces/character.interface";
import { handleHttpErrors } from "app/shared/utils";
import { environment } from "../../environments/environment";
import { StorageService } from "./storage.service";
import { Fight } from "app/interfaces/fight.interface";

@Injectable({
  providedIn: "root",
})
export class CharactersService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  updateCharacter(
    characterId: string,
    payload: Partial<Character>
  ): Observable<Character> {
    const { _id, ...character } = payload;
    const url = `${environment.backendUrl}characters/${characterId}`;
    return this.http
      .patch<Character>(url, character)
      .pipe(first(), catchError(handleHttpErrors));
  }

  getFights(characterId: string): Observable<Fight[]> {
    const url = `${environment.backendUrl}characters/${characterId}/fights`;
    return this.http
      .get<Fight[]>(url)
      .pipe(first(), catchError(handleHttpErrors));
  }

  getFighter(): Character {
    return this.storageService.getItem("fighter", true);
  }

  selectFighter(character: Character): void {
    this.storageService.setItem("fighter", character, true);
  }

  unSelectFighter(): void {
    this.storageService.removeItem("fighter");
  }
}
