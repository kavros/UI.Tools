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
    setting: Rule;
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

    private saveSetting(): void {
        const minProfit = this.data.setting.minProfit.toString();
        const profitPercentage = this.data.setting.profitPercentage.toString();

        this.data.setting.minProfit = this.fixFormat(minProfit);
        this.data.setting.profitPercentage = this.fixFormat(profitPercentage);
        console.log(this.data.setting)
        this.services.addRule(this.data.setting)
        .subscribe(() => {
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
