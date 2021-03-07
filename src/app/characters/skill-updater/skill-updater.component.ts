import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { SkillsService } from 'src/services/skills.service';

@Component({
  selector: 'app-skill-updater',
  templateUrl: './skill-updater.component.html',
  styleUrls: ['./skill-updater.component.scss']
})
export class SkillUpdaterComponent implements OnInit {

  @Input()
  skill!: string;

  @Input()
  points!: number;

  @Input()
  pointsAvailable!: number;

  @Output()
  addPoints = new EventEmitter<number>();

  @Output()
  removePoints = new EventEmitter<number>();

  public initialPoints = 0;
  public finalPoints = 0;
  public pointsToAdd = 0;

  constructor(
    library: FaIconLibrary,
    private skillsService: SkillsService
    ) {
    library.addIcons(faPlus, faMinus);
  }

  ngOnInit(): void {
    this.initialPoints = Number(this.points);
  }

  public addPoint(): void {
    if (this.skillsService.canAddHealthPoint(this.pointsAvailable)) {
      const points = this.skillsService.addHealthPoint(
        this.pointsAvailable,
        this.pointsToAdd,
        this.initialPoints
      );
      this.pointsAvailable = points.pointsAvailable;
      this.pointsToAdd = points.pointsToAdd;
      this.finalPoints = points.finalPoints;
    }
  }

  public removePoint(): void {
    if (
      this.skill === 'health' &&
      this.skillsService.canRemoveHealthPoint(this.initialPoints, this.pointsToAdd)) {
      const points = this.skillsService.removeHealthPoint(this.pointsAvailable, this.pointsToAdd, this.finalPoints);
      this.pointsAvailable = points.pointsAvailable;
      this.pointsToAdd = points.pointsToAdd;
      this.finalPoints = points.finalPoints;
    }
  }

}
