import { MatSnackBar } from '@angular/material/snack-bar';

export function AlertMessages(snackBar: MatSnackBar, message: any): void {
  snackBar.open(message, 'Dismiss', {
    duration: 10000,
    verticalPosition: 'top'
  });
}
