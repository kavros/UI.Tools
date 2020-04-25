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
      ['name', 'profitPercentage', 'minimumProfit', 'kefCode' , 'action', 'delete'];
    @Input() dataSource: MatTableDataSource<Product>;

    constructor(public dialog: MatDialog) {}

    ngOnInit(): void {

    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openDialog() {
      var newProduct = {
        name: '', defaultProfit: { value: undefined, class: ''},
        purchasePrice: 0, kefalaioPrice: 0, 
        newPrice: 0, profitInEuro: undefined,
        status: undefined, kef5Code: ''
      }as Product ;

      this.dialog.open(SettingsDialogComponent, {
        width: '250px',
        data: {title: 'Καταχώρηση νέου κανόνα', product: newProduct},
      });
      console.log(newProduct);
      //TODO add data to array and refresh table
    }

    editRule(row: Product) {
      console.log(row);
      this.dialog.open(SettingsDialogComponent, {
        width: '250px',
        data: {title: 'Επεξεργασία κανόνα', product: row},
      });
    }

    
}
