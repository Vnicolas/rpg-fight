import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { Character } from "app/interfaces/character.interface";
import { Fight } from "app/interfaces/fight.interface";
import { Turn } from "app/interfaces/turn.interface";
import { User } from "app/interfaces/user";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { WSService } from "../services/ws.service";

@Component({
  selector: "app-lobby",
  templateUrl: "./lobby.component.html",
  styleUrls: ["./lobby.component.scss"],
})
export class LobbyComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  public error = "";
  public isLoading = false;
  public currentTurn: Turn = {
    number: 0,
    attackResults: [],
    dicesResults: [],
    isLast: false,
  };
  public fighter!: Character;
  public opponentFighter!: Character;
  public opponentOwnerName!: string;
  public user!: User;
  public finalResults!: Fight;
  public fighterWinner = false;
  public opponentWinner = false;
  public timeLeftBeforeNavigation = 4; // in seconds

  constructor(
    private wsService: WSService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(first()).subscribe((data: Data) => {
      this.user = data.fighterInfos.user;
      this.fighter = data.fighterInfos.fighter;
      this.fighter.ownerName = this.user.name;
    });

    this.subscriptions.add(
      this.wsService.connected().subscribe(() => {
        this.initDemands();
        this.isLoading = true;
      })
    );
  }

  private initDisconnectEvent(): void {
    this.subscriptions.add(
      this.wsService.disconnected().subscribe(() => {
        this.router.navigateByUrl("/dashboard/characters");
      })
    );
  }

  private initSearchingOpponentEvent(): void {
    this.subscriptions.add(
      this.wsService.searchingOpponent().subscribe(() => {
        this.isLoading = true;
      })
    );
  }

  private initOpponentFoundEvent(): void {
    this.subscriptions.add(
      this.wsService.opponentFound().subscribe((opponent: Character) => {
        this.isLoading = false;
        this.currentTurn.number = 1;
        this.opponentFighter = opponent;
        this.opponentOwnerName = opponent.ownerName;
      })
    );
  }

  private initTurnResultsEvent(): void {
    this.subscriptions.add(
      this.wsService.turnResults().subscribe((results: any) => {
        this.currentTurn = results;
      })
    );
  }

  private initEndEvent(): void {
    this.subscriptions.add(
      this.wsService.end().subscribe((fight: Fight) => {
        this.finalResults = fight;
        const winnerId = this.finalResults.winnerId;
        this.fighterWinner = winnerId === this.fighter._id;
        this.opponentWinner = winnerId === this.opponentFighter._id;
        this.goToFightPage();
      })
    );
  }

  private initErrorsEvent(): void {
    this.subscriptions.add(
      this.wsService.errors().subscribe((error: string) => {
        this.error = error;
        this.goToFightPage();
      })
    );
  }

  private initDemands(): void {
    this.initErrorsEvent();
    this.initDisconnectEvent();
    this.initSearchingOpponentEvent();
    this.initOpponentFoundEvent();
    this.initTurnResultsEvent();
    this.initEndEvent();
    this.wsService.searchOpponent(this.user._id, this.fighter);
  }

  private goToFightPage(): void {
    const downloadTimer = setInterval(() => {
      if (this.timeLeftBeforeNavigation <= 0) {
        clearInterval(downloadTimer);
        this.router.navigate(["/dashboard/characters"], {
          queryParams: { refresh: true },
        });
        return;
      }
      this.timeLeftBeforeNavigation--;
    }, 1000);
  }

  @HostListener("window:beforeunload")
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
