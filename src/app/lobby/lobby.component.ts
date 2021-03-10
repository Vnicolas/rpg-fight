import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { WSService } from "../../services/ws.service";

@Component({
  selector: "app-lobby",
  templateUrl: "./lobby.component.html",
  styleUrls: ["./lobby.component.scss"],
})
export class LobbyComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  constructor(private wsService: WSService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.wsService.searchOpponent().subscribe(() => {
        console.log("le serveur recherche...");
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
