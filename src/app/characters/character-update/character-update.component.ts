import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { Character } from "../../interfaces/character.interface";
import { first } from "rxjs/operators";
import { SkillsService } from "services/skills.service";
import { CharacterFightProperty, Points, Skills } from "app/shared/utils";
import { CharactersService } from "services/characters.service";
import { UserService } from "services/user.service";
import { Subscription } from "rxjs";
import { User } from "app/interfaces/user";

@Component({
  selector: "app-character-update",
  templateUrl: "./character-update.component.html",
  styleUrls: ["./character-update.component.scss"],
})
export class CharacterUpdateComponent implements OnInit, OnDestroy {
  private user!: User;
  private subscriptions = new Subscription();

  character!: Character;
  public pointsAvailable!: number;
  public skills: Skills = {};

  public errorMessage = "";

  constructor(
    private route: ActivatedRoute,
    private skillsService: SkillsService,
    private charactersService: CharactersService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(first()).subscribe((data: Data) => {
      this.character = data.character;
      if (this.character.skillPoints === 0) {
        this.goToDashboard();
      }
      this.initSkills(this.character);
    });
    this.subscriptions.add(
      this.userService.user.subscribe((user: User) => {
        this.user = user;
      })
    );
  }

  public addPoints(skill: string): void {
    if (skill === CharacterFightProperty.HEALTH) {
      this.addHealthPoint();
    } else {
      this.addPoint(skill);
    }
  }

  public removePoints(skill: string): void {
    if (skill === CharacterFightProperty.HEALTH) {
      this.removeHealthPoint();
    } else {
      this.removePoint(skill);
    }
  }

  public update(): void {
    const payload = {
      health: this.skills.health.finalPoints,
      attack: this.skills.attack.finalPoints,
      defense: this.skills.defense.finalPoints,
      magik: this.skills.magik.finalPoints,
      skillPoints: this.pointsAvailable,
    };
    this.charactersService
      .updatePoints(this.character._id, payload)
      .pipe(first())
      .subscribe(
        (characterUpdated: Character) => {
          const characterIndex = this.user.characters.findIndex(
            (character: Character) => character._id === this.character._id
          );
          this.user.characters[characterIndex] = characterUpdated;
          this.userService.updateUser(this.user);
          this.goToDashboard();
        },
        (error: string) => {
          this.errorMessage = error;
        }
      );
  }

  private goToDashboard(): void {
    this.router.navigateByUrl("/dashboard/characters");
  }

  private initSkill(initialValue: number): Points {
    return {
      initialPoints: initialValue,
      finalPoints: initialValue,
      costs: [],
    };
  }

  private initSkills(character: Character): void {
    this.pointsAvailable = Number(character.skillPoints);
    this.skills.health = this.initSkill(this.character.health);
    this.skills.attack = this.initSkill(this.character.attack);
    this.skills.defense = this.initSkill(this.character.defense);
    this.skills.magik = this.initSkill(this.character.magik);
  }

  private addHealthPoint(): void {
    if (this.pointsAvailable > 0) {
      this.pointsAvailable--;
      this.skills.health.finalPoints++;
    }
  }

  private addPoint(skill: string): void {
    if (this.skillsService.canAddPoints(this.pointsAvailable)) {
      const pointsToAdd = this.skillsService.getDivided(this.pointsAvailable);
      this.pointsAvailable = this.pointsAvailable - pointsToAdd;
      this.skills[skill].finalPoints++;
      this.skills[skill].costs.push(pointsToAdd);
    }
  }

  private canRemovePoint(skill: string): boolean {
    return this.skillsService.canRemovePoints(
      this.skills[skill].initialPoints,
      this.skills[skill].finalPoints
    );
  }

  private removePoint(skill: string): void {
    if (this.canRemovePoint(skill)) {
      const pointsToRemove = this.skills[skill].costs[
        this.skills[skill].costs.length - 1
      ];
      this.pointsAvailable = this.pointsAvailable + pointsToRemove;
      this.skills[skill].finalPoints--;
      this.skills[skill].costs.pop();
    }
  }

  private removeHealthPoint(): void {
    if (this.canRemovePoint("health")) {
      this.pointsAvailable++;
      this.skills.health.finalPoints--;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
