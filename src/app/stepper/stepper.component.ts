import {Component, OnInit, ViewChild, Input} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/data/interfaces/product.interface';
import { Profit } from '../data/interfaces/profit.interface';
import { IconStatus } from '../data/interfaces/icon-status.interface';
import { TableComponent } from '../table/table.component';


@Component({
  selector: 'app-stepper-component',
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.css'],
})

export class StepperComponent implements OnInit {
  isLinear = false;
  dataSource: MatTableDataSource<Product>;
  @ViewChild('table2') tableStep2: TableComponent;

  ngOnInit() {
    this.dataSource =  new MatTableDataSource<Product>();
  }

  private updateDataSource(tableData: Product[]) {

    this.dataSource.data = [];
    tableData.forEach(elem => {
      elem.defaultProfit = { value: elem.profitPercentage, class: '' } as Profit;
      this.updateTrendColumn(elem);
      this.dataSource.data.push(elem);
    });
    this.dataSource._updateChangeSubscription();
    this.tableStep2.updateStep2CheckBoxes();
    
    console.log(tableData);
  }

  private updateTrendColumn(elem: Product) {
    if (elem.newPrice > elem.retailPrice) {
      elem.status =
      {
        name: 'trending_up',
        color: 'red',
        label: 'Αύξηση',
        counter: 0
      } as IconStatus;
      elem.isUpdateRequired = true;
    } else if ( elem.newPrice < elem.retailPrice ) {
      elem.status =
      {
           name: 'trending_down',
           color: 'orange',
           label: 'Μείωση',
           counter: this.getPriceDecreasesCounter(elem)
      } as IconStatus;

      if (elem.status.counter === 3) {
        elem.isUpdateRequired = true;
      } else {
        elem.isUpdateRequired = false;
      }
    } else if ( elem.newPrice === elem.retailPrice) {
      elem.status = {
        name: 'trending_flat',
        color: 'green',
        label: 'Σταθερή',
        counter: 0
      } as IconStatus;
      elem.isUpdateRequired = false;
    }
  }

  private getPriceDecreasesCounter(row: Product) {
    let c = 0;
    row.records.forEach( oldRetailPrice => {
      if (row.retailPrice > oldRetailPrice  ) {
        c++;
      }
    });
    return c;
  }

}
