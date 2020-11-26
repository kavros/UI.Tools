import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RulesService } from '../rules.service';
import { SnackBarService } from 'src/app/common/snackBar/snackBar.service';

export interface Rule {
    profitPercentage: number;
    minProfit: number;
    sCode: string;
}

export interface RuleDialogData {
    rule: Rule;
    title: string;
}

@Component({
    templateUrl: './rule-dialog.component.html'
})
export class RuleDialog  {

    constructor(
        public dialogRef: MatDialogRef<RuleDialog>,
        @Inject(MAT_DIALOG_DATA) public data: RuleDialogData,
        private services: RulesService,
        private snackBar: SnackBarService ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    saveRule(): void {
        const minProfit = this.data.rule.minProfit.toString();
        const profitPercentage = this.data.rule.profitPercentage.toString();

        this.data.rule.minProfit = this.fixFormat(minProfit);
        this.data.rule.profitPercentage = this.fixFormat(profitPercentage);
        this.services
            .addRule(this.data.rule).subscribe(() => {
                this.snackBar.showInfo('Επιτυχης καταχώρηση κανόνα.', 'Ok');
                console.log('Setting has been saved successfully');
            });
    }

    private fixFormat(val: string): number {
        if ( val.toString().indexOf(',') !== -1 ){
          val = val.replace(',', '.');
        }
        return Number(val);
    }
}
