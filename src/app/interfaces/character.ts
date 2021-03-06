import { SafeHtml } from '@angular/platform-browser';
import { Fight } from './fight';

export interface Character {
  picture: string;
  pictureSafe: SafeHtml;
  name: string;
  rank: number;
  skillPoints: number;
  health: number;
  attack: number;
  defense: number;
  magik: number;
  fights: Fight[];
  status: string;
}
