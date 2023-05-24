import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from 'src/app/models/book.model';
import { Purchase } from 'src/app/models/purchase.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookService } from 'src/app/services/book.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { AlertMessages } from 'src/app/shared/app.utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public books: Book[];

  constructor(
    private authenticationService: AuthenticationService,
    private bookServices: BookService,
    private purchaseService: PurchaseService,
    private snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.getBooks();
  }


  private getBooks(): void {
    this.bookServices.getBooks().subscribe(
      (books: Book[]) => {
        this.books = books;
      },
      (error: HttpErrorResponse) => {
        AlertMessages(this.snackBar, error);
      }
    );
  }


  purchase(item: Book) {
    if (!this.authenticationService.currentUserValue?.id) {
      AlertMessages(this.snackBar, "You should Sign in to buy a book !");
      return;
    }
    const purchase = new Purchase(this.authenticationService.currentUserValue.id, item.id, item.price);

    this.purchaseService.savePurchase(purchase).subscribe(
      data => {
        AlertMessages(this.snackBar, "book '"+item.title+"' is added to purchases ");
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        AlertMessages(this.snackBar, err);
      });
  }

  toggleFavorite(book: any) {
    book.favorite = !book.favorite;
  }


}
