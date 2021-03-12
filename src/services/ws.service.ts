import { Injectable } from "@angular/core";
import { Character } from "app/interfaces/character";
import { OpponentData } from "app/interfaces/fight";
import { Socket } from "ngx-socket-io";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WSService {
  constructor(private socket: Socket) {}

  searchOpponent(userId: string, fighter: Character): void {
    this.socket.emit("search-opponent", { userId, fighter });
  }

  searchingOpponent(): Observable<void> {
    return this.socket.fromEvent("searching");
  }

  connected(): Observable<void> {
    return this.socket.fromEvent("connected");
  }

  disconnected(): Observable<void> {
    return this.socket.fromEvent("disconnect");
  }

  opponentFound(): Observable<OpponentData> {
    return this.socket.fromEvent("opponent-found");
  }

  turnResults(): Observable<any> {
    return this.socket.fromEvent("turn-results");
  }
}
