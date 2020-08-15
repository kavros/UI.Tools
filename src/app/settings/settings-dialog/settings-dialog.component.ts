import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Setting } from 'src/app/data/interfaces/setting.interface';
import { SettingsService } from '../settings.service';


export interface SettingsDialogData {
    setting: Setting;
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
        @Inject(MAT_DIALOG_DATA) public data: SettingsDialogData,
        private services: SettingsService) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    private saveSetting(): void {
        this.services.addSetting(this.data.setting)
        .subscribe(response => {
        //TODO: show success msg in snack bar 
           console.log('Setting has been saved successfully');
        });
    }
}
