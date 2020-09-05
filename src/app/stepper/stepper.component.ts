import {Component, OnInit, ViewChild, Input} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/stepper/interfaces/product.interface';
import { Profit } from './interfaces/profit.interface';
import { IconStatus } from './interfaces/icon-status.interface';
import { ImportDTO } from './import-page/dto/import-dto';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-stepper-component',
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.css'],
})

export class StepperComponent implements OnInit {
  isLinear = false;
  dataSource: MatTableDataSource<Product>;
  invoiceDate: string;
  @ViewChild('table2') tableStep2: TableComponent;

  readonly upward  = {
    name: 'trending_up',
    color: 'red',
    label: 'Αύξηση',
    counter: 0
  } as IconStatus;

  readonly stable  = {
    name: 'trending_flat',
    color: 'green',
    label: 'Σταθερή',
    counter: 0
  } as IconStatus;

  downward = (elem: Product): IconStatus  => {
    return {
      name: 'trending_down',
      color: 'orange',
      label: 'Μείωση',
      counter: this.getPriceDecreasesCounter(elem)
    } as IconStatus;
  }

  ngOnInit() {
    this.dataSource =  new MatTableDataSource<Product>();
  }

  private updateDataSource(response: ImportDTO) {

    this.dataSource.data = [];
    response.data.forEach(elem => {
      elem.defaultProfit = { value: elem.profitPercentage, class: '' } as Profit;
      this.updateTrendColumn(elem);
      this.dataSource.data.push(elem);
    });
    this.invoiceDate = response.invoiceDate;
    this.dataSource._updateChangeSubscription();
    this.tableStep2.updateStep2CheckBoxes();

    console.log(response);
  }

  private updateTrendColumn(elem: Product) {
    if (elem.newPrice > elem.retailPrice) {

      elem.status = this.upward;
      elem.isUpdateRequired = true;

    } else if ( elem.newPrice < elem.retailPrice ) {

      elem.status = this.downward(elem);
      elem.isUpdateRequired = elem.status.counter === 3 ? true : false;

    } else if ( elem.newPrice === elem.retailPrice) {

      elem.status = this.stable;
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
