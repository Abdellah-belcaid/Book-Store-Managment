import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { AlertMessages } from 'src/app/shared/app.utils';
import { AddBookModalComponent } from './add-book-modal/add-book-modal.component';
import { EditBookModalComponent } from './edit-book-modal/edit-book-modal.component';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  public Books!: Book[];

  constructor(
    private bookServices: BookService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getBooks();
  }

  private getBooks(): void {
    this.bookServices.getBooks().subscribe(
      (books: Book[]) => {
        this.Books = books;
      },
      (error: HttpErrorResponse) => {
        AlertMessages(this.snackBar, error);
      }
    );
  }

  public onDeleteBook(Book_id: number): void {
    console.log(Book_id);
    this.bookServices.deleteBook(Book_id).subscribe(
      () => {
        this.getBooks();
        AlertMessages(this.snackBar, 'Book N° ' + Book_id + ' has been deleted successfully !');
      },
      (error: HttpErrorResponse) => {
        AlertMessages(this.snackBar, error);
        console.log(error);
      }
    );
  }

  public onOpenBookModal(book: any, operation: String) {
    var dialogRef = null as any;
    if (operation === 'add') {
      dialogRef = this.dialog.open(AddBookModalComponent);
    }
    if (operation === 'edit') {
      dialogRef = this.dialog.open(EditBookModalComponent, {
        data: book // passing book data to the dialog component
      });
    }
    dialogRef.afterClosed().subscribe(() => {
      this.getBooks();
    });
  }

}
