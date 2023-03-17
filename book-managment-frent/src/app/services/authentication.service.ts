import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const API_URL = `${environment.apiBaseUrl}/api/authentication/`

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  //private apiServerUrl = (environment as any)!.apiBaseUrl;


  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    let storageUser;
    const storageUserAsStr = localStorage.getItem("currentUser");
    if (storageUserAsStr) {
      storageUser = JSON.parse(storageUserAsStr);
    }
    this.currentUserSubject = new BehaviorSubject<User>(storageUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }



  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<any> {

    return this.http.post<any>(API_URL + `sign-in`, user).pipe(
      map(response => {
        if (response) {
          localStorage.setItem('currentUser', JSON.stringify(response));
        }
        return response;
      })
    );
  }

  register(user: User): Observable<any> {
    console.log(user);
    return this.http.post(API_URL + `sign-up`, user);
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new User);
  }
}
