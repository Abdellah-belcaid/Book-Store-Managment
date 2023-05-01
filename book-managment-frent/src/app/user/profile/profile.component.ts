import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { purchaseItem } from 'src/app/models/purchase-item.model';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { AlertMessages } from 'src/app/shared/app.utils';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  purchaseItems: purchaseItem[] = [];
  currentUser: User = new User();
  totalPrice: number = 0;

  constructor(
    private authenticationService: AuthenticationService,
    private purchaseService: PurchaseService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    console.log(this.currentUser);
  }

  ngOnInit(): void {
    this.purchaseService.getAllPurchaseItemsOfUser().subscribe(data => {
      console.log(data);
      this.purchaseItems = data;
      this.totalPrice = this.purchaseItems.reduce((acc, item) => acc + item.price, 0);
    });
  }


  public openEditModal(user: User): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: user
    });
    dialogRef.afterClosed().subscribe(() => {
      this.currentUser = this.authenticationService.currentUserValue;
    });
  }

}
