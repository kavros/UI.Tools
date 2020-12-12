import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RulesService } from '../rules.service';
import { SnackBarService } from 'src/app/common/snackBar/snackBar.service';
import { RuleTableRow } from '../rules.component';

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
        private snackBar: SnackBarService ) {
            this.stepOneEnabled = true;
            this.stepTwoEnabled = false;
        }

    onCancel(): void {
        this.dialogRef.close({event:'Cancel'}); 
    }

    onSave(): void {
        const minProfit = this.data.rule.minProfit.toString();
        const profitPercentage = this.data.rule.profitPercentage.toString();

        this.data.rule.minProfit = this.fixFormat(minProfit);
        this.data.rule.profitPercentage = this.fixFormat(profitPercentage);

        this.services
            .addOrUpdateRule(this.data.rule).subscribe(() => {
                this.snackBar.showInfo('Επιτυχης καταχώρηση κανόνα.', 'Ok');
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

    private fixFormat(val: string): number {
        if ( val.toString().indexOf(',') !== -1 ){
          val = val.replace(',', '.');
        }
        return Number(val);
    }
}
