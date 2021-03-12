import { Result } from "./results.interface";

/*
 * Will be used for type-checking and to determine the type
 * of values that will be received by the application
 */
export interface Turn {
  dicesResults: Result[];
  attackResults: Result[];
  number: number;
  isLast: boolean;
}
