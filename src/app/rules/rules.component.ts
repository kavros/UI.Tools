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
      ['name', 'profitPercentage', 'minimumProfit', 'action', 'delete'];
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
      this.loadData();
    }

    loadData() {
      this.rulesService
          .getRules()
          .subscribe( (data: RuleTableRow[]) => {
              this.dataSource.data = data;
          });
    }

    onSearch(event: Event) {
        let filterValue = (event.target as HTMLInputElement).value;
        //BUG: Currently snames are using both english and greek letters.
        //TODO: Fix snames so we can filter using greek words.
        filterValue = filterValue.trim().toUpperCase();
        this.map.forEach(el => {
          filterValue = filterValue.replace(el.gr, el.eng);
        });
        this.dataSource.filter = filterValue;
    }

    onAdd(): void {
      const input =
      {
        sName: '',
        sCode: '',
        profitPercentage: undefined,
        minProfit : undefined
      } as RuleTableRow;
      
      this.openDialog(input, 'Καταχώρηση νέου κανόνα');      
    }

    onEdit(row: RuleTableRow) {
      const input = {
        sCode: row.sCode,
        sName: row.sName,
        minProfit: row.minProfit,
        profitPercentage: row.profitPercentage
      } as RuleTableRow;

      this.openDialog(input, 'Επεξεργασία κανόνα');
    }

    openDialog(input:RuleTableRow, msg: string) {
      const dialogRef = this.dialog.open(RuleDialog, {
        width: '280px',
        data:
        {
          title: msg,
          rule: input
        } as RuleDialogData
      });

      dialogRef.afterClosed().subscribe( async result => {
        if(result?.event === 'Cancel' ) {
          return;
        }
        await this.delay(2000); // wait for update to complete
        this.dataSource.data = [];  
        this.loadData();
        
      });
    }

    delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }

    onDelete(row: RuleTableRow) {
      const msg = 'Θέλετε να διαγραφεί ο κανόνας. ' + row.sName;
      if (confirm(msg)) {
        this
          .rulesService
          .deleteRule(row).subscribe( () => {
            this.snackBar.showSuccessMsg('Επιτυχής διαγραφή κανόνα.');
            this.dataSource.data =
                    this.dataSource
                    .data
                    .filter(x => x.sName !== row.sName);
          });
      }
    }
}
