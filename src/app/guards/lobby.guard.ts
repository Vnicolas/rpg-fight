import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { StorageService } from "services/storage.service";

@Injectable({
  providedIn: "root",
})
export class LobbyGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(): boolean {
    if (!this.storageService.getItem("fighter")) {
      this.router.navigateByUrl("dashboard/characters");
      return false;
    }
    return true;
  }
}
