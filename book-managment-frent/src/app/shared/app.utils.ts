import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

export function handleHttpError(err: HttpErrorResponse): string {
  switch (err?.status) {
    case HttpStatusCode.Forbidden:
    case HttpStatusCode.InternalServerError:
    case HttpStatusCode.NotFound:
    case HttpStatusCode.Unauthorized:
    case HttpStatusCode.BadRequest:
      return `${err.status}: ${err.error}`;
    default:
      return 'An error occurred while processing your request.';
  }
}

export function AlertMessages(snackBar: MatSnackBar, message: any): void {
  message = message instanceof HttpErrorResponse ? handleHttpError(message) : message;
  snackBar.open(message, 'Dismiss', {
    duration: 10000,
    verticalPosition: 'top'
  });
}

export function convertToBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Get the name of the file
        const fileType = file.name.split('.').pop();
        console.log(fileType);
        // Convert the file data to Base64 and add the filename prefix
        const base64 = `${fileType}::` + reader.result?.toString().split(',')[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    } else {
      reject('File not found');
    }
  });
}

