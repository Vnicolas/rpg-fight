import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Character } from 'src/app/interfaces/character';
import { getStatusClass, handleHttpErrors } from 'src/app/shared/utils';
import { environment } from '../environments/environment';
import { User } from 'src/app/interfaces/user';
import { StorageService } from './storage.service';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  public user = new BehaviorSubject<User>({} as User);

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private sanitizer: DomSanitizer
    ) {
    const account = this.storageService.getItem('account', true);
    this.updateUser(account);
  }

  private setCharacterDisplayInformations(character: Character): Character {
    character.pictureSafe = this.sanitizer.bypassSecurityTrustHtml(character.picture);
    character.statusClass = getStatusClass(character.status);
    return character;
  }

  updateUser(user: User): void {
    user.characters = user.characters.map((character: Character) => {
      character = this.setCharacterDisplayInformations(character);
      return character;
    });
    this.storageService.setItem('account', user, true);
    this.user.next(user);
  }

  createUserCharacter(name: string, owner: string): Observable<Character> {
    const url = `${environment.backendUrl}users/${owner}/characters`;
    return this.http.post<Character>(url, {name})
    .pipe(
      first(),
      catchError(handleHttpErrors)
    );
  }

  deleteUserCharacter(characterId: string, owner: string): Observable<User> {
    const url = `${environment.backendUrl}users/${owner}/characters/${characterId}`;
    return this.http.delete<User>(url)
    .pipe(
      first(),
      catchError(handleHttpErrors)
    );
  }
}
