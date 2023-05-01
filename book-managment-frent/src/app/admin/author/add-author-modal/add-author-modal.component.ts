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
  public newAuthor: Author = new Author();

  constructor(private authorService: AuthorService,
    public dialogRef: MatDialogRef<AddAuthorModalComponent>,
    private snackBar: MatSnackBar
  ) { }

  public onAddAuthor(authorForm: any): void {
    console.log(authorForm.value);
    this.authorService.addAuthor(authorForm.value).subscribe(
      (response: Author) => {
        authorForm.reset();
        this.dialogRef.close();
        AlertMessages(this.snackBar, "new author :" + response.firstName + "  has been added !");
      },
      (error: HttpErrorResponse) => {
        authorForm.reset();
        AlertMessages(this.snackBar, error);
      }
    );
  }
}
