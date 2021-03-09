import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WSService {

  constructor(private socket: Socket) {}

  searchOpponent(): Observable<string>{
    return this.socket.fromEvent('searching');
  }

  // getUsers(): void{
  //   return this.socket.fromEvent('users');
  // }

}
