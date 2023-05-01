import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { AuthenticationService } from './authentication.service';
import { RequestBaseService } from './request-base.service';

const API_URL = `${environment.apiBaseUrl}/api/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService extends RequestBaseService {

  constructor(autheticationService: AuthenticationService, http: HttpClient) {
    super(autheticationService, http);
  }

  public changeUserRole(username: string, SecretKey: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + SecretKey
      })
    };
    return this.http.put(`${environment.apiBaseUrl}/api/internal/make-admin/${username}`, {}, httpOptions);
  }


  public editUser(user: User, oldPassword: string, newPassword: string, imageFile: string): Observable<any> {
    const formData = new FormData();

    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('username', user.username);
    formData.append('password', newPassword);
    formData.append('oldPassword', oldPassword);
    formData.append('imageFile', imageFile);

    return this.http.put(API_URL + `/${user.id}`, formData, { headers: this.getHeaders });
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<any>(API_URL, { headers: this.getHeaders })
      .pipe(
        map(ListOfUsers => {
          const users: User[] = [];
          for (const userWithImage of ListOfUsers) {
            const user = userWithImage.user;
            if (userWithImage.imageData)
              user.imageData = userWithImage.imageData;
            users.push(user);
          }
          return users;
        }),
      );
  }

  public deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(API_URL + `/${id}`, { headers: this.getHeaders });
  }
}
