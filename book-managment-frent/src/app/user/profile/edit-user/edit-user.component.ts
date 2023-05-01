import { Component, Inject, NgZone } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AlertMessages, convertToBase64, handleHttpError } from 'src/app/shared/app.utils'
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  user: User;
  oldPassword: string;
  newPassword: string;
  errorMessage: string;
  hidePassword: boolean;
  imageBase64: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private zone: NgZone,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditUserComponent>,
    private snackBar: MatSnackBar,
    private authenrificationService: AuthenticationService
  ) {
    this.user = data;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    convertToBase64(file)
      .then(base64 => {
        this.imageBase64 = base64;
        this.user.imageData = base64.toString().split('::')[1];
        AlertMessages(this.snackBar, "Image uploaded successfully!");
      })
      .catch(error => {
        AlertMessages(this.snackBar, error);
      });
  }

  onEditUser(event: Event) {
    event.preventDefault(); // Prevent form submission if fields are empty

    if (!this.user.username || !this.user.name || !this.oldPassword) {
      this.errorMessage = 'Please fill out all the fields.';
      return;
    }
    // Call the authentication service's editUser() method, passing in the user object and the imageBase64 data
    this.userService.editUser(this.user, this.oldPassword, this.newPassword, this.imageBase64).subscribe(
      data => {
        this.zone.run(() => {
          this.authenrificationService.setUser(this.user);
          this.router.navigate(['/profile']); // Encapsulate navigation in zone.run()
        });
        console.log(data);
        this.dialogRef.close();
        AlertMessages(this.snackBar, 'User : "' + this.user.name + '" has been edited successfully :) ');
      }, err => {
        AlertMessages(this.snackBar, err);
      })
  }


}
