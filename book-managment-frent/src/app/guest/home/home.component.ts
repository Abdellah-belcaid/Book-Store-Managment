import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { Purchase } from 'src/app/models/purchase.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookService } from 'src/app/services/book.service';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public books: Book[];
  public errorMessage: string = "";
  public infoMessage: string = "";

  constructor(
    private authenticationService: AuthenticationService,
    private bookService: BookService,
    private purchaseService: PurchaseService
  ) { }


  ngOnInit(): void {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
    })
  }

  purchase(item: Book) {
    if (!this.authenticationService.currentUserValue?.id) {
      this.errorMessage = "You should log in to buy a book !"
      return;
    }
    const purchase = new Purchase(this.authenticationService.currentUserValue.id, item.id, item.price);

    this.purchaseService.savePurchase(purchase).subscribe(
      data => {
        this.infoMessage = "Mission is completed";
        console.log(data);
      },
      err => {
        this.errorMessage = "Unexpected error occurred";
        console.log(err);
      });
  }

}
