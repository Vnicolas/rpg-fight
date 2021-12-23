import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { Character } from "app/interfaces/character.interface";
import { Fight } from "app/interfaces/fight.interface";
import { Turn } from "app/interfaces/turn.interface";
import { User } from "app/interfaces/user";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { WSService } from "../services/ws.service";
import * as getColors from "get-svg-colors-browser";

@Component({
  selector: "app-lobby",
  templateUrl: "./lobby.component.html",
  styleUrls: ["./lobby.component.scss"],
})
export class LobbyComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  public error = "";
  public isLoading = false;
  public turnUpdated = false;
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

  particlesParamsDefault = {
    fullScreen: {
      enable: false,
    },
    fpsLimit: 60,
    particles: {
      move: {
        direction: "none",
        enable: true,
        outMode: "bounce",
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        value: 50,
      },
      node: {
        size: 5,
      },
      color: {
        value: [],
      },
      links: {
        color: "random",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: false,
          },
          onclick: {
            enable: false,
          },
        },
      },
    },
  };

  particlesParamsRightReady = false;
  particlesParamsRight = JSON.parse(
    JSON.stringify(this.particlesParamsDefault)
  );
  particlesParamsLeftReady = false;
  particlesParamsLeft = JSON.parse(JSON.stringify(this.particlesParamsDefault));

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
      this.getColorsFromFighterPicture(this.fighter).then((colors) => {
        this.particlesParamsLeft.particles.color.value = colors;
        this.particlesParamsLeftReady = true;
      });
    });

    this.subscriptions.add(
      this.wsService.connected().subscribe(() => {
        this.initDemands();
        this.isLoading = true;
      })
    );
  }

  private async getColorsFromFighterPicture(
    fighter: Character
  ): Promise<string[]> {
    return await getColors(fighter.picture).then((colors: any) => {
      colors = colors.fills.filter((color: any) => {
        return color.indexOf("#") >= 0;
      });
      return colors;
    });
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
        this.currentTurn.number = 1;
        this.opponentFighter = opponent;
        this.opponentOwnerName = opponent.ownerName;
        this.getColorsFromFighterPicture(opponent).then((colors) => {
          this.particlesParamsRight.particles.color.value = colors;
          this.particlesParamsRightReady = true;
          this.isLoading = false;
        });
      })
    );
  }

  private initTurnResultsEvent(): void {
    this.subscriptions.add(
      this.wsService.turnResults().subscribe((results: any) => {
        this.currentTurn = results;
        this.turnUpdated = true;
        setTimeout(() => {
          this.turnUpdated = false;
        }, 1000);
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
        this.goToDashboardPage();
      })
    );
  }

  private initErrorsEvent(): void {
    this.subscriptions.add(
      this.wsService.errors().subscribe((error: string) => {
        this.error = error;
        this.goToDashboardPage();
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

  private goToDashboardPage(): void {
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
