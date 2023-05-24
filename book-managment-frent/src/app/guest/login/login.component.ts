import { Component, OnInit, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertMessages } from 'src/app/shared/app.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  errorMessage: string;
  hidePassword: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private zone: NgZone,
    private snackBar: MatSnackBar
  ) {
    this.user = new User();
    this.errorMessage = '';
    this.hidePassword = true;
  }

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue?.id) {
      this.zone.run(() => {
        this.router.navigate(['/profile']); // Encapsulate navigation in zone.run()
      });
      return;
    }
  }
  login(event: Event) {
    event.preventDefault();

    if (!this.user.username || !this.user.password) {
      this.errorMessage = 'Please fill out both username and password fields.';
      return;
    }

    this.zone.run(() => {
      this.authenticationService.login(this.user).subscribe(
        data => {
          this.router.navigate(['/profile']);
          AlertMessages(this.snackBar, "you have logged in successfully :) ");
        },
        err => {
          AlertMessages(this.snackBar, err);
          console.log(err);
        }
      );
    });
  }
}
