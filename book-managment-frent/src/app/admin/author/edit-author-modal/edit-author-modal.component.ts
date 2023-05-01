import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { AlertMessages } from 'src/app/shared/app.utils';


@Component({
  selector: 'app-edit-author-modal',
  templateUrl: './edit-author-modal.component.html',
  styleUrls: ['./edit-author-modal.component.css']
})
export class EditAuthorModalComponent {

  public editedAuthor!: Author;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authorService: AuthorService,
    public dialogRef: MatDialogRef<EditAuthorModalComponent>,
    private snackBar: MatSnackBar
  ) {
    console.log(data); // Log the passed data
    this.editedAuthor = data;
  }

  public onEditAuthor(editForm: any): void {
    console.log(editForm.value);
    this.authorService.updateAuthor(editForm.value).subscribe(
      (response: Author) => {
        editForm.reset();
        this.dialogRef.close();
        AlertMessages(this.snackBar, 'author ' + response.firstName + ' has been edited successfully');
      },
      (error: HttpErrorResponse) => {
        AlertMessages(this.snackBar, error);
      }
    );
  }

}
