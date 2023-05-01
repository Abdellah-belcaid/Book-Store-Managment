import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Author } from 'src/app/models/author.model';
import { Book } from 'src/app/models/book.model';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { AlertMessages } from 'src/app/shared/app.utils';



@Component({
  selector: 'app-edit-book-modal',
  templateUrl: './edit-book-modal.component.html',
  styleUrls: ['./edit-book-modal.component.css'],
})
export class EditBookModalComponent {

  public EditedBook: Book;
  public Authors: Author[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookService: BookService,
    private authorService: AuthorService,
    public dialogRef: MatDialogRef<EditBookModalComponent>,
    private snackBar: MatSnackBar
  ) {
    console.log(data); // Log the passed data
    this.EditedBook = data;
  }

  ngOnInit(): void {
    this.getAuthors();
  }

  private getAuthors(): void {
    this.authorService.getAuthors().subscribe(
      (authors: Author[]) => {
        this.Authors = authors;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        AlertMessages(this.snackBar, error);
      }
    );
  }

  public onEditBook(editForm: any): void {
    console.log(editForm.value);
    this.bookService.updateBook(editForm.value).subscribe(
      (response: Book) => {
        editForm.reset();
        this.dialogRef.close();
        AlertMessages(this.snackBar, 'Book ' + response.title + ' has been edited successfully');
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        AlertMessages(this.snackBar, error);
      }
    );
  }

}
