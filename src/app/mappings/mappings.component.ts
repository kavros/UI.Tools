import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from '../common/snackBar/snackBar.service';

export interface MappingsDialogData {
    pName: string;
    options: string[];
    tittle: string;
}

@Component({
    templateUrl: './mappings.component.html',
    styleUrls: ['./mappings.component.css']
})
export class MappingsComponent {

    constructor(
        public dialogRef: MatDialogRef<MappingsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: MappingsDialogData,
        private snackBar: SnackBarService ) {}

    saveSetting(): void {
        //TODO: save mapping.
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
