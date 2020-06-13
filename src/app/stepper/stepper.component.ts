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
  @Input() dataSource: MatTableDataSource<Product>;

  ngOnInit() {

  }

  test(tableData: Product[]){

    /*this.dataSource.data = [];
    tableData.forEach(elem => {
      console.log(elem.kef5Code);
      
      //this.dataSource.data.push(elem);
    });
    this.dataSource._updateChangeSubscription();    */
    console.log(this.dataSource.data);
  }
}
