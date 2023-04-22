import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { AlertMessages } from 'src/app/shared/app.utils';


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
  public newAuthor: Author = new Author();

  public onAddAuthor(authorForm: any): void {
    console.log(authorForm.value);
    this.authorService.addAuthor(authorForm.value).subscribe(
      (response: Author) => {
        console.log(response);
        authorForm.reset();
        this.dialogRef.close();
      },
      (error: HttpErrorResponse) => {
        AlertMessages(this.snackBar, error.message);
        authorForm.reset();
      }
    );
  }


}
