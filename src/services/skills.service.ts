import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {

  constructor() {}

  public addHealthPoint(pointsAvailable: number, pointsToAdd: number, initialPoints: number): any {
    pointsAvailable--;
    pointsToAdd++;
    const finalPoints = initialPoints + pointsToAdd;
    return {
      pointsAvailable,
      pointsToAdd,
      finalPoints
    };
  }

  public removeHealthPoint(pointsAvailable: number, pointsToAdd: number, finalPoints: number): any {
    pointsAvailable++;
    if (pointsToAdd > 0) {
      pointsToAdd--;
    }
    finalPoints--;
    return {
      pointsAvailable,
      pointsToAdd,
      finalPoints
    };
  }

  public canAddHealthPoint(pointsAvailable: number): boolean {
    return pointsAvailable > 0;
  }

  public canRemoveHealthPoint(initialPoints: number, pointsToAdd: number): boolean {
    const futurePointsToAdd = pointsToAdd - 1;
    return initialPoints + futurePointsToAdd >= initialPoints;
  }

  public canAddPoints(currentPoints: number): boolean {
    return Math.ceil(currentPoints / 5) > 0;
  }
}
