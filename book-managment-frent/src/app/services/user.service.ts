import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
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

  getUsers(): Observable<User[]> {
    return this.http.get<any>(API_URL, { headers: this.getHeaders })
      .pipe(
        map(ListOfUsers => {
          const users: User[] = [];
          for (const userWithImage of ListOfUsers) {
            const user = userWithImage.user;
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
