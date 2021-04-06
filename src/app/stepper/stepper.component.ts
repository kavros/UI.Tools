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
  allMappingsChecked: boolean = false;

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

      var checked = this.hasValidatedBefore(oldMappings,elem);      
      this.pushMapping(elem, checked)

    });
    this.invoiceDate = response.invoiceDate;
    this.dataSource._updateChangeSubscription();
    this.mappingsDataSource._updateChangeSubscription();
    this.tableStep2.updateDownloadButton();
    console.log(response);
  }

  hasValidatedBefore(oldMappings: MappingsElement[], elem: Product): boolean {
    var checked = false;
      if (oldMappings.length===0) {
          checked = false
      } else {
          var oldMapping = oldMappings.find(x => x.pNames[0] === elem.name)
          checked = oldMapping ? oldMapping.hasValidated: false;
      }
      return checked;

  }

  pushMapping(product: Product, checked: boolean): void {
    var existing = this.mappingsDataSource.data.find(x=> x.sCode === product.sCode);

    if(existing){
        existing.pNames.push(product.name);
    }else{
        var mappingElem  = new MappingsElement();
        mappingElem.sName = product.sName;
        mappingElem.sCode = product.sCode;
        mappingElem.pNames = [product.name];
        mappingElem.hasValidated = checked;
        this.mappingsDataSource.data.push(mappingElem);
    }
  }

  runImport(){
    this.dataSource.data = [];
    this.import.importAgain();
  }

  goForward(stepper: MatStepper) {
    this.allMappingsChecked = true;
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
