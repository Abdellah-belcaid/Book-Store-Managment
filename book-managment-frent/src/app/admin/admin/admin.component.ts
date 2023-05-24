import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Author } from 'src/app/models/author.model';
import { Book } from 'src/app/models/book.model';
import { Purchase } from 'src/app/models/purchase.model';
import { User } from 'src/app/models/user.model';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { UserService } from 'src/app/services/user.service';
import { AlertMessages } from 'src/app/shared/app.utils';

import { AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, AfterViewInit {

  public Users: User[] = [];
  public Books: Book[] = [];
  public Authors: Author[] = [];
  public Purchases: Purchase[] = [];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  purchaseChange: number = 0;
  userChange: number = 0;
  BookChange: number = 0;
  AuthorChange: number = 0;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private userServices: UserService,
    private snackBar: MatSnackBar,
    private purchaseService: PurchaseService,
    private authorService: AuthorService,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.getPurchases();
    this.getAuthors();
    this.getBooks();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private getAuthors(): void {
    this.authorService.getAuthors().subscribe(
      (authors: Author[]) => {
        this.Authors = authors;
      },
      (error: HttpErrorResponse) => {
        AlertMessages(this.snackBar, error);
      }
    );
  }

  private getBooks(): void {
    this.bookService.getBooks().subscribe(
      (books: Book[]) => {
        this.Books = books;
        this.BookChange = Book.calculateBookChange(books);
      },
      (error: HttpErrorResponse) => {
        AlertMessages(this.snackBar, error);
      }
    );
  }

  private getPurchases(): void {
    this.purchaseService.getAllPurchaseItems().subscribe(
      (purchases: Purchase[]) => {
        this.Purchases = purchases;
        this.purchaseChange = Purchase.calculatePurchaseChange(purchases);
      },
      (error: HttpErrorResponse) => {
        AlertMessages(this.snackBar, error);
        console.log(error);
      }
    );
  }

  private getUsers(): void {
    this.userServices.getUsers().subscribe(
      (users: User[]) => {
        this.Users = users;
        this.userChange = User.calculateUserChange(users);
        this.dataSource = new MatTableDataSource(this.Users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error: HttpErrorResponse) => {
        AlertMessages(this.snackBar, error);
        console.log(error);
      }
    );
  }

  deleteUser(userId: number) {
    this.userServices.deleteUser(userId).subscribe(
      (response: any) => {
        this.getUsers();
        AlertMessages(this.snackBar, "User N° " + userId + " has been deleted successfully ");
      },
      (error: HttpErrorResponse) => {
        AlertMessages(this.snackBar, error);
        console.log(error);
      }
    );
  }

  onChangeUserRole(user: User) {
    var secretKey = prompt("Please enter the secret key to make this user an admin:");
    console.log(secretKey);
    if (secretKey != null && secretKey !== "") {
      this.userServices.changeUserRole(user.username, secretKey).subscribe(
        (response: any) => {
          this.getUsers();
          AlertMessages(this.snackBar, response.message);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          AlertMessages(this.snackBar, error);
        }
      );
    }
  }


}
