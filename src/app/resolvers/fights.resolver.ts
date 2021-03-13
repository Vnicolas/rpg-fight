import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Fight } from "app/interfaces/fight.interface";
import { first } from "rxjs/operators";
import { CharactersService } from "services/characters.service";

@Injectable({ providedIn: "root" })
export class FightsResolver implements Resolve<Fight[]> {
  constructor(private charactersService: CharactersService) {}
  async resolve(route: ActivatedRouteSnapshot): Promise<Fight[]> {
    const fightId = route.params.id;
    const fights = await this.charactersService
      .getFights(fightId)
      .pipe(first())
      .toPromise();
    if (!fights) {
      return Promise.reject(undefined);
    }
    return Promise.resolve(fights);
  }
}
