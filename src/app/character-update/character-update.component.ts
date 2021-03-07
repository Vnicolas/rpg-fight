import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Character } from '../interfaces/character';

@Component({
  selector: 'app-character-update',
  templateUrl: './character-update.component.html',
  styleUrls: ['./character-update.component.scss']
})
export class CharacterUpdateComponent implements OnInit {

  // TODO: wip
  character!: Character;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.character = data.character;
    });
  }

}
