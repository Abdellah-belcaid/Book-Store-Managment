import { Component, NgZone, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertMessages, convertToBase64 } from 'src/app/shared/app.utils'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  errorMessage: string;
  hidePassword: boolean;
  imageBase64: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private zone: NgZone,
    private snackBar: MatSnackBar
  ) {
    this.user = new User();
    this.errorMessage = '';
    this.hidePassword = true;
    this.imageBase64 = '';
  }
  ngOnInit(): void {
    if (this.authenticationService.currentUserValue?.id) {
      this.zone.run(() => {
        this.router.navigate(['/profile']); // Encapsulate navigation in zone.run()
      });
      return;
    }
  }
  register(event: Event) {
    event.preventDefault(); // Prevent form submission if fields are empty

    if (!this.user.username || !this.user.password || !this.user.name) {
      this.errorMessage = 'Please fill out all the fields.';
      return;
    }
    this.authenticationService.register(this.user, this.imageBase64).subscribe(
      data => {
        this.zone.run(() => {
          this.router.navigate(['/login']); // Encapsulate navigation in zone.run()
        });
        AlertMessages(this.snackBar, "User has been regestered successfully");
      }, err => {
        console.log(err);
        AlertMessages(this.snackBar, err);
      })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    convertToBase64(file)
      .then(base64 => {
        this.imageBase64 = base64;
      })
      .catch(error => {
        console.error(error.error);
      });
  }

}
