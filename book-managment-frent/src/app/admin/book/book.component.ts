import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddBookModalComponent } from './add-book-modal/add-book-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditBookModalComponent } from './edit-book-modal/edit-book-modal.component';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { AlertMessages } from 'src/app/shared/app.utils'


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  public books!: Book[];

  constructor(
    private bookServices: BookService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.onGetBooks();
  }


  public onGetBooks(): void {
    this.bookServices.getBooks().subscribe(
      (response: Book[]) => {
        this.books = response;
        console.log(this.books);
      },
      (error: HttpErrorResponse) => {
        AlertMessages(this.snackBar, error.message);
      }
    );
  }



  public onDeleteBook(Book_id: number): void {
    console.log(Book_id);
    this.bookServices.deleteBook(Book_id).subscribe(
      (response: void) => {
        this.onGetBooks();
        AlertMessages(this.snackBar, 'Book N° ' + Book_id + ' deleted successfully !');
      },
      (error: HttpErrorResponse) => {
        AlertMessages(this.snackBar, error.message);
      }
    );
  }


  public openAddModal(): void {
    const dialogRef = this.dialog.open(AddBookModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      AlertMessages(this.snackBar, 'Book has been added successfully :) ');
      this.onGetBooks();
    });
  }

  public openEditModal(book: Book): void {
    const dialogRef = this.dialog.open(EditBookModalComponent, {
      data: book
    });
    dialogRef.afterClosed().subscribe(result => {
      AlertMessages(this.snackBar, 'Book has been added successfully :) ');
      this.onGetBooks();
    });
  }


}
