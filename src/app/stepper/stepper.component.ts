import {Component, OnInit, ViewChild} from '@angular/core';
import { TableComponent, Product, IconStatus, Profit } from '../table/table.component';
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

  private  a = {
      value: 35,
      class: 'line-through'
  } as Profit;

  data: Product[] =  [
    {
      name: 'Ντοματες', defaultProfit: { value: 35, class: ''},
      purchasePrice: 1.5, kefalaioPrice: 1.20, newPrice: 2.28, profitInEuro: 0.59,
      status: this.raisePriceIcon
    },
    {
      name: 'Πατάτες', defaultProfit: { value: 10, class: 'line-through'}, purchasePrice: 1.1,
      kefalaioPrice: 1.80, newPrice: 1.74, profitInEuro: 0.5,
      status: this.decreasePriceIcon/*lens*/
    },
    {
      name: 'Μήλα', defaultProfit: { value: 10, class: 'line-through'}, purchasePrice: 1.12,
      kefalaioPrice: 1.76, newPrice: 1.76, profitInEuro: 0.5,
      status: this.noActionIcon
    }
  ];

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Product>(this.data);
  }
}
