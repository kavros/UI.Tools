import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


export interface SettingsDialogData {
    title: string;
    name: string;
    profitPercentage: string;
    profitInEuro: string;
    Kef5Code: string;
  }


@Component({
    selector: 'settings-dialog',
    templateUrl: './settings-dialog.component.html',
    styleUrls: ['./settings-dialog.component.css']
})

export class SettingsDialogComponent  {

    constructor(
        public dialogRef: MatDialogRef<SettingsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: SettingsDialogData) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}
