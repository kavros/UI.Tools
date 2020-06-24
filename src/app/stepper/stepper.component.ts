import {Component, OnInit, ViewChild, Input} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/data/interfaces/product.interface';
import { MockTableData } from 'src/app/data/mock-table-data';
import { Profit } from '../data/interfaces/profit.interface';
import { IconStatus } from '../data/interfaces/icon-status.interface';


@Component({
  selector: 'app-stepper-component',
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.css'],
})

export class StepperComponent implements OnInit {
  isLinear = false;
  @Input() dataSource: MatTableDataSource<Product>;

  ngOnInit() {

  }

  test(tableData: Product[]){

    this.dataSource.data = [];
    tableData.forEach(elem => {
      elem.defaultProfit = { value: elem.profitPercentage, class: '' } as Profit;
      elem.status =
      {
        name: 'trending_down',
        color: 'orange',
        label: 'Μείωση',
        counter: 3
      } as IconStatus;

      this.dataSource.data.push(elem);
    });
    this.dataSource._updateChangeSubscription();
    console.log(tableData);
  }
}
