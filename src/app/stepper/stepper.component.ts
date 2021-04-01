import {Component, OnInit, ViewChild, Input} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/stepper/interfaces/product';
import { Profit } from './interfaces/profit.interface';
import { ImportDTO } from './import-page/dto/import-dto';
import { TableComponent } from './table/table.component';
import { StepperComponentService } from './services/stepper.component.service';
import { MappingsElement } from '../mappings/mappings.component';
import { ImportComponent } from './import-page/import.component';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-stepper-component',
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.css'],
})

export class StepperComponent implements OnInit {
  isLinear = false;
  dataSource: MatTableDataSource<Product>;
  mappingsDataSource: MatTableDataSource<MappingsElement>;
  invoiceDate: string;
  @ViewChild('table2') tableStep2: TableComponent;
  @ViewChild('import') import: ImportComponent;

  constructor( private service: StepperComponentService ) {}

  ngOnInit() {
    this.dataSource =  new MatTableDataSource<Product>();
    this.mappingsDataSource =  new MatTableDataSource<MappingsElement>();
  }

  updateDataSource(response: ImportDTO) {
    const oldMappings = this.mappingsDataSource.data;
    this.dataSource.data = [];
    this.mappingsDataSource.data = [];
    response.data.forEach( (elem: Product) => {
      elem = new Product(elem);
      elem.defaultProfit = { value: elem.profitPercentage, class: '' } as Profit;
      elem.updateTrendColumn();
      this.dataSource.data.push(elem);

      const checked = (oldMappings.length===0) ? false : oldMappings.find(x => x.sName === elem.sName).hasValidated;
      this.pushMapping( elem.sName,elem.name, elem.sCode, checked)

    });
    this.invoiceDate = response.invoiceDate;
    this.dataSource._updateChangeSubscription();
    this.mappingsDataSource._updateChangeSubscription();
    this.tableStep2.updateDownloadButton();
    console.log(response);
  }

  pushMapping(sName: string, pName: string, sCode: string, checked: boolean): void {
    var mappingElem  = new MappingsElement();
    mappingElem.sName = sName;
    mappingElem.sCode = sCode;
    mappingElem.pNames = [pName];
    mappingElem.hasValidated = checked;
    this.mappingsDataSource.data.push(mappingElem);
  }

  runImport(){
    this.dataSource.data = []
    this.import.importAgain();
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }

  downloadHistory() {
    this.service.downloadHistoryDoc().subscribe((data: Blob) => {
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'history.docx';
      link.click();
    });
  }
}
