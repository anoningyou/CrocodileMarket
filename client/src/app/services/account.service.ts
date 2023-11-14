import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseHttpService {
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(http: HttpClient,
     private cookieService: CookieService) {
      super(http, 'account');
   }

  loadUser() {
    if (!!this.cookieService.get('.AspNetCore.Cookies')){
      this.http.get<User>(`${this.rootUrl}getCurrentUser`, { withCredentials: true }).pipe(take(1)).subscribe({
        next:(response: User) => {
          this.setCurrentUser(response ?? null);
        },
        error: _ => {
          this.setCurrentUser(null);
        }
      })
    }
    else {
      this.setCurrentUser(null);
    } 
  }

  login(model: any){
    return this.http.post<User>(`${this.rootUrl}login`,model, { withCredentials: true }).pipe(
      map((response: User) => {
        this.setCurrentUser(response ?? null);
      })
    )
  }

  logout() {
    this.setCurrentUser(null);
    this.http.get(`${this.rootUrl}logout`, { withCredentials: true }).subscribe( _ => {})
  }

  register(model: any){
    return this.http.post<User>(`${this.rootUrl}register`,model, { withCredentials: true }).pipe(
      map((user: User) => {
        this.setCurrentUser(user ?? null);
      })
    );
  }

  private setCurrentUser(user: User | null){
    this.currentUserSource.next(user);
  }
}
