import { Injectable } from '@angular/core';
import { getDivided } from 'app/shared/utils';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {

  constructor() {}

  public canRemovePoints(initialPoints: number, amount: number): boolean {
    return amount > initialPoints;
  }

  public canAddPoints(points: number): boolean {
    return getDivided(points) > 0;
  }

  public getDivided(points: number): number {
    return getDivided(points);
  }
}
