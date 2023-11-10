import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {
    this.loadUser();

   }

  loadUser(): void {
    const userStr = localStorage.getItem('user');
    console.log(userStr)
    if (userStr) {
      const user: User = JSON.parse(userStr) as User;
      this.currentUserSource.next(user);
    }
  }

  login(model: any){
    return this.http.post<User>(`${this.baseUrl}account/login`,model, { withCredentials: true }).pipe(
      map((response: User) => {
        const user = response;
        if(user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.http.get(`${this.baseUrl}account/logout`).subscribe( _ => {})
  }

  setCurrentUser(user: User){
    console.log(user)
    localStorage.setItem('user',JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  register(model:any){
    return this.http.post<User>(`${this.baseUrl}account/register`,model, { withCredentials: true }).pipe(
      map((user: User) => {
        console.log(user);
        if(user) {
          this.setCurrentUser(user);
        }
      })
    );
  }
}
