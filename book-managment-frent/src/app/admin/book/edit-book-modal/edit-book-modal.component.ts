import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Author } from 'src/app/models/author.model';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { AlertMessages } from 'src/app/shared/app.utils';
import { AuthorComponent } from '../../author/author.component';


@Component({
  selector: 'app-edit-book-modal',
  templateUrl: './edit-book-modal.component.html',
  styleUrls: ['./edit-book-modal.component.css'],
  providers: [AuthorComponent],
})
export class EditBookModalComponent {

  public EditedBook: Book;
  public Authors: Author[];

  constructor(
    private authorComp: AuthorComponent,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookService: BookService,
    public dialogRef: MatDialogRef<EditBookModalComponent>,
    private snackBar: MatSnackBar
  ) {
    console.log(data); // Log the passed data
    this.EditedBook = data;
  }

  ngOnInit(): void {
    this.authorComp.onGetAuthors().then(authors => {
      this.Authors = authors;
      console.log(this.Authors);
    }).catch(error => {
      AlertMessages(this.snackBar,error);
    });
  }


  public onEditBook(editForm: any): void {
    console.log(editForm.value);
    this.bookService.updateBook(editForm.value).subscribe(
      (response: Book) => {
        console.log(response);
        AlertMessages(this.snackBar,'Book ' + response.title + ' has been edited successfully');
        editForm.reset();
        this.dialogRef.close();
      },
      (error: HttpErrorResponse) => {
        AlertMessages(this.snackBar,error.message);
        editForm.reset();
      }
    );
  }

}
