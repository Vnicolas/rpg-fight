import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Character } from '../../interfaces/character';
import { first } from 'rxjs/operators';
import { SkillsService } from 'src/services/skills.service';
import { CharacterFightProperty } from 'src/app/shared/utils';
import { CharacterResolver } from 'src/app/resolvers/character.resolver';


export interface Points {
  health: number;
  attack: number;
  defense: number;
  magik: number;
}

@Component({
  selector: 'app-character-update',
  templateUrl: './character-update.component.html',
  styleUrls: ['./character-update.component.scss']
})
export class CharacterUpdateComponent implements OnInit {

  character!: Character;
  public initialPoints!: Points;
  public finalPoints!: Points;
  public pointsToAdd!: Points;
  public pointsAvailable = 0;

  constructor(private route: ActivatedRoute, private skillsService: SkillsService) { }

  ngOnInit(): void {
    this.route.data.pipe(first()).subscribe((data: Data) => {
      this.character = data.character;
      this.initAllPoints(this.character);
    });
  }

  private initPoints(params: Points, value?: number): Points {
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
    const params = {
      health: character.health,
      attack: character.attack,
      defense: character.defense,
      magik: character.magik,
    };
    this.finalPoints = this.initPoints(params);
    this.pointsToAdd = this.initPoints(params, 0);
  }

  private addHealthPoint(): void {
    if (this.skillsService.canAddHealthPoint(this.pointsAvailable)) {
      const points = this.skillsService.addHealthPoint(
        this.pointsAvailable,
        this.pointsToAdd.health,
        this.initialPoints.health
      );
      this.pointsAvailable = points.pointsAvailable;
      this.pointsToAdd.health = points.pointsToAdd;
      this.finalPoints.health = points.finalPoints;
    }
  }

  private removeHealthPoint(): void {
    if (this.skillsService.canRemoveHealthPoint(this.initialPoints.health, this.pointsToAdd.health)) {
      const points = this.skillsService.removeHealthPoint(
        this.pointsAvailable,
        this.pointsToAdd.health,
        this.finalPoints.health
      );
      this.pointsAvailable = points.pointsAvailable;
      this.pointsToAdd.health = points.pointsToAdd;
      this.finalPoints.health = points.finalPoints;
    }
  }

  public addPoints(skill: string): void {
    switch (skill) {
      case CharacterFightProperty.HEALTH:
        this.addHealthPoint();
        break;
      case CharacterFightProperty.ATTAK:

       break;
      case CharacterFightProperty.DEFENSE:

        break;
      case CharacterFightProperty.MAGIK:

        break;
      default:
        break;
    }
  }

  public removePoints(skill: string): void {
    switch (skill) {
      case CharacterFightProperty.HEALTH:
        this.removeHealthPoint();
        break;
      case CharacterFightProperty.ATTAK:

       break;
      case CharacterFightProperty.DEFENSE:

        break;
      case CharacterFightProperty.MAGIK:

        break;
      default:
        break;
    }
  }

}
