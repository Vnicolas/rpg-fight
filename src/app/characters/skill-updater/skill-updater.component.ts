import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-skill-updater',
  templateUrl: './skill-updater.component.html',
  styleUrls: ['./skill-updater.component.scss']
})
export class SkillUpdaterComponent {

  @Input()
  skill!: string;

  @Input()
  initialPoints!: number;

  @Input()
  pointsToAdd!: number;

  @Output()
  addPoints = new EventEmitter<void>();

  @Output()
  removePoints = new EventEmitter<number>();

  constructor(library: FaIconLibrary) {
    library.addIcons(faPlus, faMinus);
  }

  public addPoint(): void {
    this.addPoints.emit();
  }

  public removePoint(): void {
    this.removePoints.emit();
  }
}
