import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book.model';
import { Author } from 'src/app/models/author.model';
import { AddAuthorModalComponent } from '../../author/add-author-modal/add-author-modal.component';
import { AuthorComponent } from '../../author/author.component';
import { AlertMessages } from 'src/app/shared/app.utils';


@Component({
  selector: 'app-add-book-modal',
  templateUrl: './add-book-modal.component.html',
  styleUrls: ['./add-book-modal.component.css'],
  providers: [AuthorComponent],
})
export class AddBookModalComponent implements OnInit {
  public Authors!: Author[];
  public newBook: Book = new Book();

  constructor(
    private authorComp: AuthorComponent,
    private bookService: BookService,
    private dialogRef: MatDialogRef<AddAuthorModalComponent>,
    private snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.authorComp.onGetAuthors().then(authors => {
      this.Authors = authors;
      console.log(this.Authors);
    }).catch(error => {
      AlertMessages(this.snackBar, error.message);
    });
  }


  public onAddBook(bookForm: any): void {
    console.log(bookForm.value);
    this.bookService.addBook(bookForm.value).subscribe(
      (response: Book) => {
        console.log(response);
        bookForm.reset();
        this.dialogRef.close();
      },
      (error: HttpErrorResponse) => {
        AlertMessages(this.snackBar, error.message);
        //bookForm.reset();
      }
    );
  }

}
