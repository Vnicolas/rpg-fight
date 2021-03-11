import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";
import { Character } from "app/interfaces/character";
import { OpponentData } from "app/interfaces/fight";
import { User } from "app/interfaces/user";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { WSService } from "../../services/ws.service";

@Component({
  selector: "app-lobby",
  templateUrl: "./lobby.component.html",
  styleUrls: ["./lobby.component.scss"],
})
export class LobbyComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  public isLoading = false;
  public currentTurn = 1;
  public fighter!: Character;
  public opponentFighter!: Character;
  public opponentOwnerName!: string;
  public user!: User;

  constructor(private wsService: WSService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.pipe(first()).subscribe((data: Data) => {
      this.fighter = data.fighterInfos.fighter;
      this.user = data.fighterInfos.user;
    });

    this.subscriptions.add(
      this.wsService.connected().subscribe(() => {
        this.opponentFighter = (undefined as unknown) as Character;
        this.opponentOwnerName = "";
        this.initDemands();
        this.isLoading = true;
      })
    );
  }

  private initDemands(): void {
    this.subscriptions.add(
      this.wsService.searchingOpponent().subscribe(() => {
        this.isLoading = true;
      })
    );

    this.subscriptions.add(
      this.wsService.opponentFound().subscribe((opponentData: OpponentData) => {
        this.isLoading = false;
        this.opponentFighter = opponentData.fighterByRank;
        this.opponentOwnerName = opponentData.ownerName;
      })
    );

    this.subscriptions.add(
      this.wsService.turnResults().subscribe((results: any) => {
        console.log("results", results);
      })
    );

    this.wsService.searchOpponent(this.user._id, this.fighter);
  }

  @HostListener("window:beforeunload")
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
