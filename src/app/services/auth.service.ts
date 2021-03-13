import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, first } from "rxjs/operators";
import { User } from "app/interfaces/user";
import { handleHttpErrors } from "app/shared/utils";
import { StorageService } from "./storage.service";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) {}

  public isAuthenticated(): boolean {
    const token = this.storageService.getItem("account", true);
    return !!token;
  }

  signup(name: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${environment.backendUrl}users`, { name, password })
      .pipe(first(), catchError(handleHttpErrors));
  }

  signin(name: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${environment.backendUrl}users/login`, { name, password })
      .pipe(first(), catchError(handleHttpErrors));
  }

  logout(): void {
    this.storageService.removeItem("account");
    this.storageService.removeItem("fighter");
    this.router.navigateByUrl("/home");
  }
}
