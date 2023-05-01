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
          const userData = response.user;
          userData.imageData = response.imageData;
          console.log(userData)
          localStorage.setItem('currentUser', JSON.stringify(userData));
        }
        return response;
      })
    );
  }

  register(user: User, imageBase64: string): Observable<any> {
    console.log(user);

    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('password', user.password);
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('imageFile', imageBase64);

    console.log(JSON.stringify(formData));

    return this.http.post(API_URL + `sign-up`, formData);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new User);
  }
  setUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
