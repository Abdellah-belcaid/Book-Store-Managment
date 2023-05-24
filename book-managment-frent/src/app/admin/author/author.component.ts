import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { AlertMessages } from 'src/app/shared/app.utils';
import { AddAuthorModalComponent } from './add-author-modal/add-author-modal.component';
import { EditAuthorModalComponent } from './edit-author-modal/edit-author-modal.component';


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit, AfterViewInit {

  public Authors!: Author[];
  dataSource: MatTableDataSource<Author> = new MatTableDataSource();

  constructor(
    private authorServices: AuthorService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getAuthors();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private getAuthors(): void {
    this.authorServices.getAuthors().subscribe(
      (authors: Author[]) => {
        this.Authors = authors;
        this.dataSource = new MatTableDataSource(this.Authors);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        AlertMessages(this.snackBar, error);
      }
    );
  }


  public onDeleteAuthor(author_id: number): void {
    this.authorServices.deleteAuthor(author_id).subscribe(
      (response: void) => {
        this.getAuthors();
        AlertMessages(this.snackBar, 'Author N° ' + author_id + 'has been deleted successfully !');
      },
      (error: HttpErrorResponse) => {
        AlertMessages(this.snackBar, error);
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
      this.getAuthors();
    });
  }

}
