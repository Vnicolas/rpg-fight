import { Fight } from "./fight";

export interface Character {
  _id: string;
  picture: string;
  name: string;
  rank: number;
  skillPoints: number;
  health: number;
  attack: number;
  defense: number;
  magik: number;
  fights: Fight[];
  status: string;
  statusClass: string;
  ownerName: string;
}
