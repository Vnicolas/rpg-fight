import { Fight } from './fight';

export interface Character {
  name: string;
  rank: number;
  skillPoints: number;
  health: number;
  attack: number;
  defense: number;
  magik: number;
  fights: Fight[];
}
