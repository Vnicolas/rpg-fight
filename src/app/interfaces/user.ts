import { Character } from './character';

export interface UserPayload {
  name: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  characters: Character[];
}
