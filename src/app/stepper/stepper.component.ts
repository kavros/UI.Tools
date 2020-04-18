import {Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/data/interfaces/product.interface';
import { MockTableData } from 'src/data/mock-table-data';


@Component({
  selector: 'app-stepper-component',
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.css'],
})

export class StepperComponent implements OnInit {
  isLinear = false;
  mockData = new MockTableData();
  dataSource: MatTableDataSource<Product>;

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Product>(this.mockData.data);
  }
}
