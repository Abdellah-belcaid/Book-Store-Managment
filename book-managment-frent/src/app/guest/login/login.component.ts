import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  errorMessage: string = '';

  constructor(private authenticationService: AuthenticationService, private router: Router) {

  }
  ngOnInit(): void {
    if (this.authenticationService.currentUserValue?.id) {
      this.router.navigate(['/profile']);
      return;
    }
  }

  login() {
    this.authenticationService.login(this.user).subscribe(
      data => {
        this.router.navigate(['/profile']);
        console.log(data);
      },
      err => {
        this.errorMessage = "Username or password is incorrect !";
        console.log(err);
        console.log(err.message);
      })
  }


}
