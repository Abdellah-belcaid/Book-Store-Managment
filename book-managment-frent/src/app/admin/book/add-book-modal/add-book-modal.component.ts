import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Author } from 'src/app/models/author.model';
import { Book } from 'src/app/models/book.model';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { AlertMessages } from 'src/app/shared/app.utils';
import { AddAuthorModalComponent } from '../../author/add-author-modal/add-author-modal.component';


@Component({
  selector: 'app-add-book-modal',
  templateUrl: './add-book-modal.component.html',
  styleUrls: ['./add-book-modal.component.css'],
})
export class AddBookModalComponent implements OnInit {
  public Authors!: Author[];
  public newBook: Book = new Book();

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private dialogRef: MatDialogRef<AddAuthorModalComponent>,
    private snackBar: MatSnackBar
  ) { }


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

  public onAddBook(bookForm: any): void {
    console.log(bookForm.value);
    this.bookService.addBook(bookForm.value).subscribe(
      (response: Book) => {
        bookForm.reset();
        this.dialogRef.close();
        AlertMessages(this.snackBar, 'Book ' + response.title + ' has been added successfully');
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        AlertMessages(this.snackBar, error);
      }
    );
  }

}
