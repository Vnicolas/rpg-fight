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

  public removePoint(pointsAvailable: number, pointsToAdd: number, finalPoints: number): any {
    pointsAvailable = pointsAvailable + pointsToAdd;
    finalPoints = finalPoints - pointsToAdd;
    return {
      pointsAvailable,
      pointsToAdd,
      finalPoints
    };
  }

  public addPoint(pointsAvailable: number, initialPoints: number): any {
    const futurePointsToAdd = Math.ceil(pointsAvailable / 5);
    const futurePointsAvailable = pointsAvailable - futurePointsToAdd;
    const finalPoints = initialPoints + futurePointsToAdd;
    return {
      pointsAvailable: futurePointsAvailable,
      pointsToAdd: futurePointsToAdd,
      finalPoints
    };
  }

  public canAddHealthPoint(pointsAvailable: number): boolean {
    return pointsAvailable > 0;
  }

  public canRemovePoint(initialPoints: number, amount = 1): boolean {
    if (initialPoints === 0) {
      const pointsAdded = initialPoints + amount;
      return pointsAdded - initialPoints >= 0;
    }
    return initialPoints - (-amount) >= 0 && amount > 0;
  }

  public canAddPoints(pointsAvailable: number): boolean {
    return Math.ceil(pointsAvailable / 5) > 0;
  }
}
