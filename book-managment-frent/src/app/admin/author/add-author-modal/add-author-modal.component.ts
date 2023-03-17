import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';


@Component({
  selector: 'app-add-author-modal',
  templateUrl: './add-author-modal.component.html',
  styleUrls: ['./add-author-modal.component.css']
})
export class AddAuthorModalComponent {

  constructor(private authorService: AuthorService,
    public dialogRef: MatDialogRef<AddAuthorModalComponent>,
    private snackBar: MatSnackBar
  ) { }

  // New author object
  public newAuthor: Author =
    {
      id: null as any,
      firstName: null as any,
      lastName: null as any,
      address: null as any,
      birthDate: null as any,
    };


  public onAddAuthor(authorForm: any): void {
    console.log(authorForm.value);
    this.authorService.addAuthor(authorForm.value).subscribe(
      (response: Author) => {
        console.log(response);
        authorForm.reset();
        this.dialogRef.close();
      },
      (error: HttpErrorResponse) => {
        this.AlertMessage(error.message);
        authorForm.reset();
      }
    );
  }


  private AlertMessage(message: any): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 10000,
      verticalPosition: 'top'
    });
  }

}
