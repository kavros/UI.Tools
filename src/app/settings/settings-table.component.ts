import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { Setting } from '../data/interfaces/setting.interface';



@Component({
    selector: 'settings-table',
    templateUrl: './settings-table.component.html',
    styleUrls: ['./settings-table.component.css']
})

export class SettingsTableComponent implements OnInit {
    displayedColumns: string[] =
      ['name', 'profitPercentage', 'minimumProfit', 'kefCode' , 'action', 'delete'];
    dataSource: MatTableDataSource<Setting>;

    constructor(public dialog: MatDialog) {}

    ngOnInit(): void {
      this.dataSource = new MatTableDataSource<Setting>();
      this.dataSource.data.push(
      {
        name: 'Ntomates',
        profitPercentage: 0.3,
        minimumProfit : 0.5,
        sCode: '2082'
      }as Setting);
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
      }as Setting ;

      this.dialog.open(SettingsDialogComponent, {
        width: '250px',
        data: {title: 'Καταχώρηση νέου κανόνα', product: newProduct},
      });
      console.log(newProduct);
      //TODO add data to array and refresh table
    }

    editRule(row: Setting) {
      console.log(row);
      this.dialog.open(SettingsDialogComponent, {
        width: '250px',
        data: {title: 'Επεξεργασία κανόνα', product: row},
      });
    }
}
