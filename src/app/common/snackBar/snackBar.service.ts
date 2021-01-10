import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class SnackBarService {
    constructor(private snackBar: MatSnackBar) { }

    public showError(msg: string, action: string): void {
        this.snackBar.open(msg, action, {
            duration: -1,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar']
          });
    }
    public showSuccessMsg(msg: string): void {
        this.snackBar.open(msg, null, {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['isa_success']
          });
    }

    public showAndRemain(msg: string, action: string): void {
        this.snackBar.open(msg, action, {
            duration: -1,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
    }
}
