import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { User } from "app/interfaces/user";
import { StorageService } from "services/storage.service";
import { Character } from "../interfaces/character";

export interface FighterInterface {
  user: User;
  fighter: Character;
}

@Injectable({ providedIn: "root" })
export class FighterResolver implements Resolve<FighterInterface> {
  constructor(private storageService: StorageService) {}
  async resolve(): Promise<FighterInterface> {
    const fighter = this.storageService.getItem("fighter", true);
    const user = this.storageService.getItem("account", true);
    if (!fighter || !user) {
      return Promise.reject(undefined);
    }
    return Promise.resolve({ user, fighter });
  }
}
