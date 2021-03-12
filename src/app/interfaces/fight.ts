import { Character } from "./character";
import { Turn } from "./turn.interface";

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

export interface FinalResult {
  winnerOwner: string;
  looserOwner: string;
  winner: string;
  looser: string;
  turns: Turn[];
}
