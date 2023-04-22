import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Purchase } from '../models/purchase.model';
import { AuthenticationService } from './authentication.service';
import { RequestBaseService } from './request-base.service';

const API_URL = `${environment.apiBaseUrl}/api/purchase-history`;

@Injectable({
  providedIn: 'root'
})
export class PurchaseService extends RequestBaseService {

  constructor(autheticationService: AuthenticationService, http: HttpClient) {
    super(autheticationService, http);
  }

  public savePurchase(purchase: Purchase): Observable<any> {
    if (this.currentUser.role === "ADMIN") {
      return throwError("Unauthorized access");
    }
    return this.http.post(API_URL, purchase, { headers: this.getHeaders });
  }

  public getAllPurchaseItemsOfUser(): Observable<any> {
    return this.http.get(API_URL + `/${this.authenticationService.currentUserValue.id}`, { headers: this.getHeaders });
  }

  public getAllPurchaseItems(): Observable<any> {
    return this.http.get(API_URL, { headers: this.getHeaders });
  }

}
