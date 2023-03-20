import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book.model';
import { Author } from 'src/app/models/author.model';
import { AddAuthorModalComponent } from '../../author/add-author-modal/add-author-modal.component';
import { AuthorComponent } from '../../author/author.component';


@Component({
  selector: 'app-add-book-modal',
  templateUrl: './add-book-modal.component.html',
  styleUrls: ['./add-book-modal.component.css'],
  providers: [AuthorComponent],
})
export class AddBookModalComponent implements OnInit {
  public Authors!: Author[];
  public newBook: Book = {
    id: null as any,
    title: null as any,
    price: null as any,
    publishDate: null as any,
    amount: null as any,
    author: null as any
  };


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
      this.handleErrors(error);
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
        this.handleErrors(error);
        bookForm.reset();
      }
    );
  }

  private handleErrors(error: HttpErrorResponse): void {
    this.snackBar.open(error.message, 'Dismiss', {
      duration: 10000,
      verticalPosition: 'top'
    });
  }

}
