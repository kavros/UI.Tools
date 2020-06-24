import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Rule } from 'src/app/data/interfaces/rule.interface';


export interface SettingsDialogData {
    rule: Rule;
    title: string;
}


@Component({
    selector: 'settings-dialog',
    templateUrl: './settings-dialog.component.html',
    styleUrls: ['./settings-dialog.component.css']
})

export class SettingsDialogComponent  {

    constructor(
        public dialogRef: MatDialogRef<SettingsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: SettingsDialogData ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}
