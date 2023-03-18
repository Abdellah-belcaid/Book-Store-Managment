import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
    private zone: NgZone
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
    event.preventDefault(); // Prevent form submission if fields are empty

    if (!this.user.username || !this.user.password) {
      this.errorMessage = 'Please fill out both username and password fields.';
      return;
    }

    this.authenticationService.login(this.user).subscribe(
      data => {
        this.zone.run(() => {
          this.router.navigate(['/profile']); // Encapsulate navigation in zone.run()
        });
        console.log(data);
      },
      err => {
        if (err.status === 401) {
          this.errorMessage = 'Invalid username or password!';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
        console.log(err);
      }
    );
  }

}
