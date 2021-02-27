import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InputConverterService } from '../../common/functions/input.converter.service';
import { SnackBarService } from '../../common/snackBar/snackBar.service';
import { MappingsDialogService } from './stepper.dialog.services';

export interface StepperDialogData {
    pName: string;
    tittle: string;
    sCode: string;
    profitPercentage: number;
    minProfit: number;
    sName: string;
}
@Component({
    templateUrl: './stepper.dialog.component.html'
})
export class StepperDialogComponent {
    isStepOneEnabled: boolean = true;
    isStepTwoEnabled: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<StepperDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: StepperDialogData,
        private readonly mappingsService: MappingsDialogService,
        private snackBar: SnackBarService,
        private inputConverter: InputConverterService) { }

    onSave(): void {
        this.data.minProfit = this.inputConverter.fixFormat(this.data.minProfit.toString());
        this.data.profitPercentage = this.inputConverter.fixFormat(this.data.profitPercentage.toString());
        this.mappingsService
            .addOrUpdateStepperDialogData(this.data)
            .subscribe( () =>{
                this.snackBar
                    .showSuccessMsg('Επιτυχής καταχώρηση κανόνα και αντιστοίχισης');
            });
    }

    onNext() {
        this.isStepOneEnabled = false;
        this.isStepTwoEnabled = true;
        this.mappingsService.getStepperDialogData(this.data.sCode).subscribe( (x: StepperDialogData) =>{
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
