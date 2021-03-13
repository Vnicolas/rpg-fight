import { Character } from "./character.interface";

export interface UserPayload {
  name: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  characters: Character[];
}
