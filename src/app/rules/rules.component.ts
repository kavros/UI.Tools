import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RuleDialog, RuleDialogData, Rule } from './rules-dialog/rule-dialog.component';

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

    constructor(public dialog: MatDialog) {}

    ngOnInit(): void {
      this.dataSource = new MatTableDataSource<RuleTableRow>();
      this.dataSource.data.push(
      {
        sName: 'Ntomates',
        profitPercentage: 0.3,
        minProfit : 0.5,
        sCode: '2082'
      }as RuleTableRow);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openDialog(): void {
      const newRule =
      {
        profitPercentage: 0.3,
        minProfit : 0.5,
        sCode: '2082'
      } as Rule ;

      const dialogRef = this.dialog.open(RuleDialog, {
        width: '260px',
        data: {
          title: 'Καταχώρηση νέου κανόνα',
          rule: newRule
        } as RuleDialogData,
      });
      //TODO: update table
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
      });
    }

    editRule(row: RuleTableRow) {
      console.log(row);
      this.dialog.open(RuleDialog, {
        width: '250px',
        data:
        {
          title: 'Επεξεργασία κανόνα',
          rule: row
         } as RuleDialogData
      });
    }
}
