import {Component, OnInit, ViewChild, Input} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/stepper/interfaces/product';
import { Profit } from './interfaces/profit.interface';
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

  ngOnInit() {
    this.dataSource =  new MatTableDataSource<Product>();
  }

  private updateDataSource(response: ImportDTO) {

    this.dataSource.data = [];
    response.data.forEach( (elem: Product) => {
      elem = new Product(elem);
      elem.defaultProfit = { value: elem.profitPercentage, class: '' } as Profit;
      elem.updateTrendColumn();
      this.dataSource.data.push(elem);
    });
    this.invoiceDate = response.invoiceDate;
    this.dataSource._updateChangeSubscription();
    this.tableStep2.updateStep2CheckBoxes();

    console.log(response);
  }
}
