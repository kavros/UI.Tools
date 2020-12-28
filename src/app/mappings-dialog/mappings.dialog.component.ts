import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InputConverterService } from '../common/functions/input.converter.service';
import { SnackBarService } from '../common/snackBar/snackBar.service';
import { MappingsDialogService } from './mappings.dialog.services';

export interface MappingsDialogData {
    pName: string;
    tittle: string;
    sCode: string;
    profitPercentage: number;
    minProfit: number;
    sName: string;
}
@Component({
    templateUrl: './mappings.dialog.component.html'
})
export class MappingsDialogComponent {
    isStepOneEnabled: boolean = true;
    isStepTwoEnabled: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<MappingsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: MappingsDialogData,
        private readonly mappingsService: MappingsDialogService,
        private snackBar: SnackBarService,
        private inputConverter: InputConverterService) { }

    onSave(): void {
        this.data.minProfit = this.inputConverter.fixFormat(this.data.minProfit.toString());
        this.data.profitPercentage = this.inputConverter.fixFormat(this.data.profitPercentage.toString());
        this.mappingsService
            .addOrUpdateMappingDialogData(this.data)
            .subscribe( () =>{
                this.snackBar
                    .showInfo('Επιτυχής καταχώρηση κανόνα και αντιστοίχισης', 'Κλείσιμο');
            });
    }

    onNext() {
        this.isStepOneEnabled = false;
        this.isStepTwoEnabled = true;
        this.mappingsService.getMappingDialogData(this.data.sCode).subscribe( (x: MappingsDialogData) =>{
            this.data.profitPercentage = x.profitPercentage;
            this.data.minProfit = x.minProfit;
            this.data.sName = x.sName;
        }) 
        
    }

    onPrevious() {
        this.isStepOneEnabled = true;
        this.isStepTwoEnabled = false;
    }

}
