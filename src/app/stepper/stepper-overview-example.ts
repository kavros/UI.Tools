import {Component, OnInit, ViewChild} from '@angular/core';
import { TableComponent, Product } from '../table/table.component';
import { MatTableDataSource } from '@angular/material/table';

/**
 * @title Stepper overview
 */
@Component({
  selector: 'stepper-overview-example',
  templateUrl: 'stepper-overview-example.html',
  styleUrls: ['stepper-overview-example.css'],
})


export class StepperOverviewExample implements OnInit {
  isLinear = false;
  @ViewChild(TableComponent) table1: TableComponent;
  @ViewChild(TableComponent) table2: TableComponent;
  @ViewChild(TableComponent) table3: TableComponent;

  dataSource: MatTableDataSource<Product>;
  data: Product[] =  [
    { name: 'Ντοματες', defaultProfit: '10', purchasePrice: 1.5, kefalaioPrice: 1.20, newPrice: 1.65, profitInEuro: 0.15, status: '^'},
    { name: 'Πατάτες', defaultProfit: '10', purchasePrice: 1.1, kefalaioPrice: 1.80, newPrice: 1.21, profitInEuro: 0.11, status: '|!|'}
  ];

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Product>(this.data);
    
  }

  init() {
    //this.table1.updateProfitsState();
    //this.table2.setUpdatePricesState();
    //this.table3.setPrintLabelsState();
  }
}
