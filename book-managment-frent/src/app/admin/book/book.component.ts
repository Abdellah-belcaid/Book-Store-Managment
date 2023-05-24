import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
export class BookComponent implements OnInit, AfterViewInit {

  public Books: Book[] = [];
  dataSource: MatTableDataSource<Book> = new MatTableDataSource();

  constructor(
    private bookServices: BookService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getBooks();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private getBooks(): void {
    this.bookServices.getBooks().subscribe(
      (books: Book[]) => {
        this.Books = books;
        this.dataSource = new MatTableDataSource(this.Books);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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
