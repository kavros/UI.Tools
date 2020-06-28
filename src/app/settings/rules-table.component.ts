import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { Rule } from '../data/interfaces/rule.interface';



@Component({
    selector: 'rules-table',
    templateUrl: './rules-table.component.html',
    styleUrls: ['./rules-table.component.css']
})

export class RulesTableComponent implements OnInit {
    displayedColumns: string[] =
      ['name', 'profitPercentage', 'minimumProfit', 'kefCode' , 'action', 'delete'];
    dataSource: MatTableDataSource<Rule>;

    constructor(public dialog: MatDialog) {}

    ngOnInit(): void {
      this.dataSource = new MatTableDataSource<Rule>();
      this.dataSource.data.push(
      {
        name: 'Ntomates',
        profitPercentage: 0.3,
        minimumProfit : 0.5,
        sCode: '2082'
      }as Rule);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openDialog() {
      const newProduct = {
        name: '',
        profitPercentage: 0.3,
        minimumProfit : 0.5,
        sCode: '2082'
      }as Rule ;

      this.dialog.open(SettingsDialogComponent, {
        width: '250px',
        data: {title: 'Καταχώρηση νέου κανόνα', product: newProduct},
      });
      console.log(newProduct);
      //TODO add data to array and refresh table
    }

    editRule(row: Rule) {
      console.log(row);
      this.dialog.open(SettingsDialogComponent, {
        width: '250px',
        data: {title: 'Επεξεργασία κανόνα', product: row},
      });
    }
}
