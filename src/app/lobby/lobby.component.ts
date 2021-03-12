import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { Character } from "app/interfaces/character";
import { FinalResult, OpponentData } from "app/interfaces/fight";
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
  public currentTurn: any = {
    number: 0,
    attackResults: [],
    dicesResults: [],
  };
  public fighter!: Character;
  public opponentFighter!: Character;
  public opponentOwnerName!: string;
  public user!: User;
  public finalResults!: FinalResult;
  public fighterWinner = false;
  public opponentWinner = false;

  constructor(
    private wsService: WSService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(first()).subscribe((data: Data) => {
      this.fighter = data.fighterInfos.fighter;
      this.user = data.fighterInfos.user;
    });

    this.subscriptions.add(
      this.wsService.connected().subscribe(() => {
        this.initDemands();
        this.isLoading = true;
      })
    );
  }

  private initDemands(): void {
    this.subscriptions.add(
      this.wsService.disconnected().subscribe(() => {
        this.router.navigateByUrl("/dashboard/characters");
      })
    );

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
        console.log("this.opponentFighter", this.opponentFighter);
      })
    );

    this.subscriptions.add(
      this.wsService.turnResults().subscribe((results: any) => {
        this.currentTurn = results;
        console.log("results", results);
      })
    );

    this.subscriptions.add(
      this.wsService.end().subscribe((fight: FinalResult) => {
        this.finalResults = fight;
        const winnerId = this.finalResults.winner;
        this.fighterWinner = winnerId === this.fighter._id;
        this.opponentWinner = winnerId === this.opponentFighter._id;
        console.log("fight", fight);
      })
    );

    this.wsService.searchOpponent(this.user._id, this.fighter);
  }

  private gotToFightPage(fightId: string): void {
    this.router.navigateByUrl(`/fight/${fightId}`);
  }

  @HostListener("window:beforeunload")
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
