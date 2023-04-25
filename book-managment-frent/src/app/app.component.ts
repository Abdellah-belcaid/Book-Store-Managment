import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './models/role.enum';
import { User } from './models/user.model';
import { AuthenticationService } from './services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  currentUser: User = new User();
  isLoading = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }

  ngOnInit() {
    this.setLoading(true);
    window.onload = () => {
      this.isLoading = false;
    };
  }


  isAdmin() {
    return this.currentUser?.role === Role.ADMIN;
  }

  logOut() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }


  setLoading(value: boolean): void {
    this.isLoading = value;
  }

}
