import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book.model';
import { AuthenticationService } from './authentication.service';
import { RequestBaseService } from './request-base.service';

const API_URL = `${environment.apiBaseUrl}/api/books`;

@Injectable({
  providedIn: 'root'
})
export class BookService extends RequestBaseService {

  constructor(autheticationService: AuthenticationService, http: HttpClient) {
    super(autheticationService, http);
  }

  public getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(API_URL);
  }

  public addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(API_URL, book, { headers: this.getHeaders });
  }

  public updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(API_URL, book, { headers: this.getHeaders });
  }

  public deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(API_URL + `/${id}`, { headers: this.getHeaders });
  }
}

