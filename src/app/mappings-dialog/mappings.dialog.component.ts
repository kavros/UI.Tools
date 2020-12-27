import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MappingsDialogService } from './mappings.dialog.services';
import { RulesService } from '../rules/rules.service';
import { RuleTableRow } from '../rules/rules.component';

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
        private readonly rulesService:  RulesService) { }

    onSave(): void {
// spike: how we handle cases where mappings exists but we miss the rule
        this.mappingsService.saveMappings(this.data).subscribe();

        var rule = {
            sName: this.data.sName,
            profitPercentage: this.data.profitPercentage,
            minProfit: this.data.minProfit,
            sCode: this.data.sCode
        } as RuleTableRow;

        this.rulesService.addOrUpdateRule(rule).subscribe();
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
