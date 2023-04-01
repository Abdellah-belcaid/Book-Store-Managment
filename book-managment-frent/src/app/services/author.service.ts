import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Author } from '../models/author.model';
import { AuthenticationService } from './authentication.service';
import { RequestBaseService } from './request-base.service';

const API_URL = `${environment.apiBaseUrl}/api/authors`

@Injectable({
  providedIn: 'root'
})
export class AuthorService extends RequestBaseService {

  constructor(autheticationService: AuthenticationService, http: HttpClient) {
    super(autheticationService, http);
  }

  public getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(API_URL);
  }

  public getAuthorById(id: number): Observable<Author> {
    return this.http.get<Author>(API_URL + `/${id}` ,{ headers: this.getHeaders });
  }

  public addAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(API_URL, author, { headers: this.getHeaders });
  }

  public updateAuthor(author: Author): Observable<Author> {
    return this.http.put<Author>(API_URL, author, { headers: this.getHeaders });
  }

  public deleteAuthor(id: number): Observable<void> {
    return this.http.delete<void>(API_URL + `/${id}`, { headers: this.getHeaders });
  }
}
