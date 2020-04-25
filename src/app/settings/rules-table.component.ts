import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../data/interfaces/product.interface';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';


@Component({
    selector: 'rules-table',
    templateUrl: './rules-table.component.html',
    styleUrls: ['./rules-table.component.css']
})

export class RulesTableComponent implements OnInit {
    displayedColumns: string[] =
      ['name', 'profitPercentage', 'minimumProfit', 'kefCode' , 'action'];
    @Input() dataSource: MatTableDataSource<Product>;

    constructor(public dialog: MatDialog) {}

    ngOnInit(): void {

    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openDialog() {
      this.dialog.open(SettingsDialogComponent, {
        width: '250px',
        data: {title: 'Καταχώρηση νέου κανόνα'},
      });
    }

    editRule(product: Product){
      console.log(product);
      this.dialog.open(SettingsDialogComponent, {
        width: '250px',
        data: {title: 'Επεξεργασία κανόνα', product},
      });
    }

    
}
