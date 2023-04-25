import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AlertMessages } from 'src/app/shared/app.utils';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error === 'jwt expired') {
          // handle expired JWT token error
          console.log('JWT token expired');
          this.authenticationService.logout();
          this.router.navigate(['/login']);
          AlertMessages(this.snackBar, "JWT token is expired ! please sign in again ");
          return EMPTY;
        }
        return throwError(error);
      })
    );
  }
}
