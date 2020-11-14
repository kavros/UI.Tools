import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MappingsDialogService } from './mappings.dialog.services';

export interface MappingsDialogData {
    pName: string;
    options: DropDownDTO[];
    tittle: string;
}
export interface DropDownDTO {
    sName: string;
    sCode: string;
}
export interface Mappings {
    pName: string;
    sCode: string;
}
@Component({
    templateUrl: './mappings.dialog.component.html'
})
export class MappingsDialogComponent {
    selectedMapping: Mappings;
    constructor(
        public dialogRef: MatDialogRef<MappingsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: MappingsDialogData,
        private readonly mappingsService: MappingsDialogService ) {}

    saveMapping(): void {
        this.mappingsService.
            saveMappings(this.selectedMapping)
            .subscribe();
    }

    onChange(sName: string) {
        this.selectedMapping = {
            pName: this.data.pName,
            sCode: this.data.options.find(x => x.sName === sName).sCode
        };
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
