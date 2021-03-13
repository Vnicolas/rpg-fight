import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { UserService } from "app/services/user.service";
import { first } from "rxjs/operators";
import { Character } from "../interfaces/character.interface";

@Injectable({ providedIn: "root" })
export class CharacterResolver implements Resolve<Character> {
  constructor(private userService: UserService) {}
  async resolve(route: ActivatedRouteSnapshot): Promise<Character> {
    const user = await this.userService.user.pipe(first()).toPromise();
    const characterId = route.params.id;
    const characterWanted = user.characters.find(
      (character: Character) => character._id === characterId
    ) as Character;
    if (!characterWanted) {
      return Promise.reject(undefined);
    }
    return Promise.resolve(characterWanted);
  }
}
