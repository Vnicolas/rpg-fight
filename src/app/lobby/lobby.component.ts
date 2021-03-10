import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { WSService } from "../../services/ws.service";

@Component({
  selector: "app-lobby",
  templateUrl: "./lobby.component.html",
  styleUrls: ["./lobby.component.scss"],
})
export class LobbyComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  public isLoading = false;

  constructor(private wsService: WSService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.wsService.searchOpponent().subscribe(() => {
        this.isLoading = true;
        console.log("le serveur recherche...");
      })
    );
  }

  @HostListener("window:beforeunload")
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
