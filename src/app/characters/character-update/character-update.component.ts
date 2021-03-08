import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Character } from '../../interfaces/character';
import { first } from 'rxjs/operators';
import { SkillsService } from 'src/services/skills.service';
import { CharacterFightProperty, Points } from 'src/app/shared/utils';
import { CharactersService } from 'src/services/characters.service';
import { UserService } from 'src/services/user.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-character-update',
  templateUrl: './character-update.component.html',
  styleUrls: ['./character-update.component.scss']
})
export class CharacterUpdateComponent implements OnInit, OnDestroy {

  private user!: User;
  private subscriptions = new Subscription();

  character!: Character;
  public initialPoints!: Points;
  public finalPoints!: Points;
  public pointsToAdd!: Points;
  public lastPointsAdded!: Points;
  public pointsAvailable = 0;
  public errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private skillsService: SkillsService,
    private charactersService: CharactersService,
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.data.pipe(first()).subscribe((data: Data) => {
      this.character = data.character;
      this.initAllPoints(this.character);
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
      health: this.finalPoints.health,
      attack: this.finalPoints.attack,
      defense: this.finalPoints.defense,
      magik: this.finalPoints.magik,
      skillPoints: this.pointsAvailable
    };
    this.charactersService.updatePoints(this.character._id, payload)
    .pipe(first())
    .subscribe((characterUpdated: Character) => {
      const characterIndex = this.user.characters.findIndex(
        (character: Character) => character._id === this.character._id);
      this.user.characters[characterIndex] = characterUpdated;
      this.userService.updateUser(this.user);
      this.goToDashboard();
    }, (error: string) => {
      this.errorMessage = error;
    });
  }

  private goToDashboard(): void {
    this.router.navigateByUrl('/dashboard/characters');
  }

  private initPoints(params: Character |Points, value?: number): Points {
    if (value === undefined) {
      return {
        health: Number(params.health),
        attack: Number(params.attack),
        defense: Number(params.defense),
        magik: Number(params.magik),
      };
    }
    return {
      health: value || 0,
      attack: value || 0,
      defense: value || 0,
      magik: value || 0,
    };

  }

  private initAllPoints(character: Character): void {
    this.pointsAvailable = Number(character.skillPoints);
    this.initialPoints = this.initPoints(character);
    const params: Points = {
      health: character.health,
      attack: character.attack,
      defense: character.defense,
      magik: character.magik,
    };
    this.finalPoints = this.initPoints(params);
    this.pointsToAdd = this.initPoints(params, 0);
    this.lastPointsAdded = this.initPoints(params, 0);
  }

  private addHealthPoint(): void {
    if (this.skillsService.canAddHealthPoint(this.pointsAvailable)) {
      const points = this.skillsService.addHealthPoint(
        this.pointsAvailable,
        this.pointsToAdd.health,
        this.initialPoints.health
      );
      this.lastPointsAdded.health = points.pointsToAdd;
      this.pointsAvailable = points.pointsAvailable;
      this.pointsToAdd.health = points.pointsToAdd;
      this.finalPoints.health = points.finalPoints;
    }
  }

  private removeHealthPoint(): void {
    if (this.skillsService.canRemovePoint(this.initialPoints.health, this.lastPointsAdded.health)) {
      const points = this.skillsService.removeHealthPoint(
        this.pointsAvailable,
        this.pointsToAdd.health,
        this.finalPoints.health
      );
      this.lastPointsAdded.health = points.pointsToAdd;
      this.pointsAvailable = points.pointsAvailable;
      this.pointsToAdd.health = points.pointsToAdd;
      this.finalPoints.health = points.finalPoints;
    }
  }

  private addPoint(skill: string): void {
    if (this.skillsService.canAddPoints(this.pointsAvailable)) {
      const points = this.skillsService.addPoint(
        this.pointsAvailable,
        this.pointsToAdd[skill]
      );
      this.lastPointsAdded[skill] = points.pointsToAdd;
      this.pointsAvailable = points.pointsAvailable;
      this.pointsToAdd[skill] = this.pointsToAdd[skill] + points.pointsToAdd;
      this.finalPoints[skill] = points.finalPoints;
    }
  }

  private removePoint(skill: string): void {
    if (this.skillsService.canRemovePoint(this.initialPoints[skill], this.lastPointsAdded[skill])) {
      const points = this.skillsService.removePoint(
        this.pointsAvailable,
        this.lastPointsAdded[skill],
        this.finalPoints[skill]
      );
      this.lastPointsAdded[skill] = points.pointsToAdd;
      this.pointsAvailable = points.pointsAvailable;
      this.pointsToAdd[skill] = this.pointsToAdd[skill] - points.pointsToAdd;
      this.finalPoints[skill] = points.finalPoints;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
