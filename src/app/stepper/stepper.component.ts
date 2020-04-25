import {Component, OnInit, ViewChild, Input} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/data/interfaces/product.interface';
import { MockTableData } from 'src/app/data/mock-table-data';


@Component({
  selector: 'app-stepper-component',
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.css'],
})

export class StepperComponent implements OnInit {
  isLinear = false;
  //mockData = new MockTableData();
  @Input() dataSource: MatTableDataSource<Product>;

  ngOnInit() {
    //this.dataSource = new MatTableDataSource<Product>(this.mockData.data);
  }
}
