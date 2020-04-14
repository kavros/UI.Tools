import {Component, OnInit, ViewChild} from '@angular/core';
import { TableComponent, Product, IconStatus } from '../table/table.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-stepper-component',
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.css'],
})


export class StepperComponent implements OnInit {
  isLinear = false;
  @ViewChild(TableComponent) table1: TableComponent;
  @ViewChild(TableComponent) table2: TableComponent;
  @ViewChild(TableComponent) table3: TableComponent;

  dataSource: MatTableDataSource<Product>;
  private raisePriceIcon = {
    name: 'trending_up',
    color: 'red',
    label: 'Αύξηση'

  } as IconStatus;

  private decreasePriceIcon = {
    name: 'trending_down',
    color: 'orange',
    label: 'Μείωση'
  } as IconStatus;

  private noActionIcon = {
    name: 'trending_flat',
    color: 'green',
    label: 'Σταθερή'
  } as IconStatus; 

  data: Product[] =  [
    { name: 'Ντοματες', defaultProfit: '10', purchasePrice: 1.5, 
      kefalaioPrice: 1.20, newPrice: 1.65, profitInEuro: 0.15, status: this.raisePriceIcon},
    { name: 'Πατάτες', defaultProfit: '10', purchasePrice: 1.1, 
      kefalaioPrice: 1.80, newPrice: 1.21, profitInEuro: 0.11, status: this.decreasePriceIcon/*lens*/},
    { name: 'Μήλα', defaultProfit: '10', purchasePrice: 1.1, 
      kefalaioPrice: 1.80, newPrice: 1.80, profitInEuro: 0.11, status: this.noActionIcon}
  ];

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Product>(this.data);
  }
}
