import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Fighter } from "app/interfaces/fight.interface";
import { StorageService } from "app/services/storage.service";

@Injectable({ providedIn: "root" })
export class FighterResolver implements Resolve<Fighter> {
  constructor(private storageService: StorageService) {}
  async resolve(): Promise<Fighter> {
    const fighter = this.storageService.getItem("fighter", true);
    const user = this.storageService.getItem("account", true);
    if (!fighter || !user) {
      return Promise.reject(undefined);
    }
    return Promise.resolve({ user, fighter });
  }
}
