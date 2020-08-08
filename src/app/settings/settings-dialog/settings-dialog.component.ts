import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Setting } from 'src/app/data/interfaces/setting.interface';


export interface SettingsDialogData {
    rule: Setting;
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
