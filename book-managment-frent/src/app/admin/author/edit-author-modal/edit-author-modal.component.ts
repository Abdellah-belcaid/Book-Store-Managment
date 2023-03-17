import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';


@Component({
  selector: 'app-edit-author-modal',
  templateUrl: './edit-author-modal.component.html',
  styleUrls: ['./edit-author-modal.component.css']
})
export class EditAuthorModalComponent {

  public EditedAuthor!: Author;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authorService: AuthorService,
    public dialogRef: MatDialogRef<EditAuthorModalComponent>,
    private snackBar: MatSnackBar
  ) {
    console.log(data); // Log the passed data
    console.log(data.id);
    this.EditedAuthor = data;
  }

  public onEditAuthor(editForm: any): void {
    console.log(editForm.value);
    this.authorService.updateAuthor(editForm.value).subscribe(
      (response: Author) => {
        console.log(response);
        this.AlertMassages('author ' + response.firstName + ' has been edited successfully');
        editForm.reset();
        this.dialogRef.close();
      },
      (error: HttpErrorResponse) => {
        this.AlertMassages(error.message);
        editForm.reset();
      }
    );
  }

  private AlertMassages(message: any): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 10000,
      verticalPosition: 'top'
    });
  }

}
