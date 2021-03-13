import { Fight } from "./fight.interface";

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

export interface Points {
  initialPoints: number;
  finalPoints: number;
  costs: number[];
}

export interface Skills {
  [key: string]: Points;
}

export interface Point {
  [key: string]: number;
}

export interface PointsCost {
  [key: string]: number[];
}

export const enum CharacterStatus {
  NOT_READY = "Not Ready",
  READY = "Ready",
  IN_FIGHT = "In Fight",
  RESTING = "Resting",
}

export const enum CharacterFightProperty {
  HEALTH = "health",
  ATTAK = "attack",
  DEFENSE = "defense",
  MAGIK = "magik",
}
