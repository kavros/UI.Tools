import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RulesService } from '../rules.service';
import { SnackBarService } from 'src/app/common/snackBar/snackBar.service';
import { RuleTableRow } from '../rules.component';
import { InputConverterService } from 'src/app/common/functions/input.converter.service';

export interface Rule {
    profitPercentage: number;
    minProfit: number;
    sCode: string;
}

export interface RuleDialogData {
    rule: RuleTableRow;
    title: string;
}

@Component({
    templateUrl: './rule-dialog.component.html'
})
export class RuleDialog  {
    stepOneEnabled: boolean;
    stepTwoEnabled: boolean;

    constructor(
        public dialogRef: MatDialogRef<RuleDialog>,
        @Inject(MAT_DIALOG_DATA) public data: RuleDialogData,
        private rulesService: RulesService,
        private services: RulesService,
        private snackBar: SnackBarService,
        private inputConverter: InputConverterService) {
            this.stepOneEnabled = true;
            this.stepTwoEnabled = false;
        }

    onCancel(): void {
        this.dialogRef.close({event:'Cancel'}); 
    }

    onSave(): void {
        const minProfit = this.data.rule.minProfit.toString();
        const profitPercentage = this.data.rule.profitPercentage.toString();

        this.data.rule.minProfit = this.inputConverter.fixFormat(minProfit);
        this.data.rule.profitPercentage = this.inputConverter.fixFormat(profitPercentage);

        this.services
            .addOrUpdateRule(this.data.rule).subscribe(() => {
                this.snackBar.showSuccessMsg('Επιτυχης καταχώρηση κανόνα.');
            });
    }

    onNext(): void {
        this.rulesService
            .getSName(this.data.rule.sCode)
            .subscribe(row => {
                this.data.rule.sName = row.sName;
            });
        this.stepOneEnabled = false;
        this.stepTwoEnabled = true;
    }
}
