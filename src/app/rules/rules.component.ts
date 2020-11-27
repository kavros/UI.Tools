import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RuleDialog, RuleDialogData, Rule } from './rules-dialog/rule-dialog.component';
import { RulesService } from './rules.service';
import { SnackBarService } from '../common/snackBar/snackBar.service';

export interface RuleTableRow {
  sName: string;
  profitPercentage: number;
  minProfit: number;
  sCode: string;
}

@Component({
    selector: 'app-rules-component',
    templateUrl: './rules.component.html',
    styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {
    displayedColumns: string[] =
      ['name', 'profitPercentage', 'minimumProfit', 'kefCode' , 'action', 'delete'];
    dataSource: MatTableDataSource<RuleTableRow>;
    map = [
      { eng: 'A', gr:  'Α'},
      { eng: 'B', gr:  'Β'},
      { eng: 'E', gr:  'Ε'},
      { eng: 'Z', gr:  'Ζ'},
      { eng: 'H', gr:  'Η'},
      { eng: 'I', gr:  'Ι'},
      { eng: 'K', gr:  'Κ'},
      { eng: 'M', gr:  'Μ'},
      { eng: 'N', gr:  'Ν'},
      { eng: 'O', gr:  'Ο'},
      { eng: 'P', gr:  'P'},
      { eng: 'T', gr:  'Τ'},
      { eng: 'X', gr:  'Χ'}
    ];
    constructor(public dialog: MatDialog,
                private rulesService: RulesService,
                private snackBar: SnackBarService) {}

    ngOnInit(): void {
      this.dataSource = new MatTableDataSource<RuleTableRow>();

      this.rulesService
          .getRules()
          .subscribe( (data: RuleTableRow[]) => {
              this.dataSource.data = data;
          });
    }

    applyFilter(event: Event) {
        let filterValue = (event.target as HTMLInputElement).value;
        //BUG: Currently snames are using both english and greek letters.
        //TODO: Fix snames so we can filter using greek words.
        filterValue = filterValue.trim().toUpperCase();
        this.map.forEach(el => {
          filterValue = filterValue.replace(el.gr, el.eng);
        });
        this.dataSource.filter = filterValue;
        console.log(this.dataSource.filter);
    }

    openDialog(): void {
      const newRule =
      {
        profitPercentage: 0.3,
        minProfit : 0.5,
        sCode: '2082'
      } as Rule ;

      const dialogRef = this.dialog.open(RuleDialog, {
        width: '250px',
        data: {
          title: 'Καταχώρηση νέου κανόνα',
          rule: newRule
        } as RuleDialogData,
      });
      //TODO: update rules table
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
      });
    }

    editRule(row: RuleTableRow) {
      this.dialog.open(RuleDialog, {
        width: '250px',
        data:
        {
          title: 'Επεξεργασία κανόνα',
          rule: row
         } as RuleDialogData
      });
    }

    deleteRule(row: RuleTableRow) {
      const msg = 'Θέλετε να διαγραφεί ο κανόνας. ' + row.sName;
      if (confirm(msg)) {
        this
          .rulesService
          .deleteRule(row).subscribe( () => {
            this.snackBar.showInfo('Επιτυχής διαγραφή κανόνα.', 'Ok');
            this.dataSource.data =
                    this.dataSource
                    .data
                    .filter(x => x.sName !== row.sName);
          });
      }
    }

}
