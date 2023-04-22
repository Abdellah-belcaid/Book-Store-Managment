import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddAuthorModalComponent } from './add-author-modal/add-author-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditAuthorModalComponent } from './edit-author-modal/edit-author-modal.component';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { AlertMessages } from 'src/app/shared/app.utils'


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  public Authors!: Author[];

  constructor(
    private authorServices: AuthorService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.onGetAuthors().then(authors => {
      this.Authors = authors;
      console.log(this.Authors);
    }).catch(error => {
      AlertMessages(this.snackBar, error.message);
    });
  }

  public onGetAuthors(): Promise<Author[]> {
    return new Promise<Author[]>((resolve, reject) => {
      this.authorServices.getAuthors().subscribe(
        (response: Author[]) => {
          this.Authors = response;
          resolve(response);
        },
        (error: HttpErrorResponse) => {
          AlertMessages(this.snackBar,error.message);
        }
      );
    });
  }

  public onDeleteAuthor(author_id: number): void {
    this.authorServices.deleteAuthor(author_id).subscribe(
      (response: void) => {
        this.onGetAuthors();
        AlertMessages(this.snackBar,'Author N° ' + author_id + 'has been deleted successfully !');
      },
      (error: HttpErrorResponse) => {
        AlertMessages(this.snackBar,error.message);
      }
    );
  }


  public onOpenAuthorModal(author: any, operation: String) {
    var dialogRef = null as any;
    if (operation === 'add') {
      dialogRef = this.dialog.open(AddAuthorModalComponent);
    }
    if (operation === 'edit') {
      dialogRef = this.dialog.open(EditAuthorModalComponent, {
        data: author // passing author data to the dialog component
      });
    }
    dialogRef.afterClosed().subscribe(() => {
      this.onGetAuthors();
    });
  }

}
