import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
    private zone: NgZone
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
        console.log(data);
      }, err => {
        if (err?.status === 409) {
          this.errorMessage = "Username already exist !  ";
        } else {
          this.errorMessage = "Unexpected error occurred , Error is :  " + err?.errorMessage;
          console.log(err);
        }
      })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Get the name of the file
        const fileType = file.name.split('.').pop();
        console.log(fileType);
        // Convert the file data to Base64 and add the filename prefix
        this.imageBase64 = `${fileType}::` + reader.result?.toString().split(',')[1];
      };
    }
  }


}
