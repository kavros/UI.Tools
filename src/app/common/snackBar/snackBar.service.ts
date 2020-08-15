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
    public showInfo(msg: string, action: string): void {
        this.snackBar.open(msg, action, {
            duration: 1000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
    }
}
