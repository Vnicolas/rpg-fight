import { Character } from "./character";

export interface OpponentData {
  fighterByRank: Character;
  ownerName: string;
}

export interface Fight {
  characters: Character[];
  winner: Character;
  looser: Character;
  turns: number;
  winnerAttackValue: number;
  looserAttackValue: number;
  winnerHealthPointsSub: number;
  looserHealthPointsSub: number;
}
