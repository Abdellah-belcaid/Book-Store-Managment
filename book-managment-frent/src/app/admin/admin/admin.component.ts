import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AlertMessages } from 'src/app/shared/app.utils'
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  public Users!: User[];

  constructor(
    private UserServices: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.onGetUsers();
  }

  public onGetUsers(): void {
    this.UserServices.getUsers().subscribe(
      (response: User[]) => {
        this.Users = response;
        console.log(this.Users);
      },
      (error: HttpErrorResponse) => {
        AlertMessages(this.snackBar, error.message);
        console.log(error);
      }
    );
  }


  openEditModal(user: User) {

  }

  onDeleteUser(userId: number) {
    this.UserServices.deleteUser(userId).subscribe(
      (response: any) => {
        this.onGetUsers();
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        AlertMessages(this.snackBar, error.message);
        console.log(error);
      }
    );
  }


}
