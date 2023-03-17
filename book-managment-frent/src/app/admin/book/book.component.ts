import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddBookModalComponent } from './add-book-modal/add-book-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditBookModalComponent } from './edit-book-modal/edit-book-modal.component';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';


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
        this.AlertMassages(error.message);
      }
    );
  }



  public onDeleteBook(Book_id: number): void {
    console.log(Book_id);
    this.bookServices.deleteBook(Book_id).subscribe(
      (response: void) => {
        this.onGetBooks();
        this.AlertMassages('Book ' + response + ' deleted successfully !');
      },
      (error: HttpErrorResponse) => {
        this.AlertMassages(error.message);
      }
    );
  }


  public openAddModal(): void {
    const dialogRef = this.dialog.open(AddBookModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.AlertMassages('Book has been added successfully :) ');
      this.onGetBooks();
    });
  }

  public openEditModal(book: Book): void {
    const dialogRef = this.dialog.open(EditBookModalComponent, {
      data: book
    });
    dialogRef.afterClosed().subscribe(result => {
      this.AlertMassages('Book has been added successfully :) ');
      this.onGetBooks();
    });
  }

  private AlertMassages(message: any): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 10000,
      verticalPosition: 'top'
    });
  }



}
