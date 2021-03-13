import { Character } from "./character.interface";
import { Turn } from "./turn.interface";
import { User } from "./user";

export interface OpponentData {
  fighterByRank: Character;
  ownerName: string;
}

export interface Fight {
  winnerId: string;
  looserId: string;
  winnerName: string;
  looserName: string;
  winnerOwnerName: string;
  looserOwnerName: string;
  turns: Turn[];
  createdAt: string;
}

export interface Fighter {
  user: User;
  fighter: Character;
}
