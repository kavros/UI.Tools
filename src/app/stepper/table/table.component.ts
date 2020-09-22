import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/stepper/interfaces/product';
import { TableState } from './enums/table-state.enum';
import { SnackBarService } from '../../common/snackBar/snackBar.service';
import { StepperComponentService } from '../services/stepper.component.service';
import { DownloadLabelsDTO, Label } from '../import-page/dto/download.labels.dto';

export class Button {
  public isVisible: boolean;
  public isDisabled: boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  @Input() ELEMENT_DATA: Product[];
  displayedColumns: string[] =
    ['product', 'defaultProfit', 'purchasePrice', 'kefalaioPrice', 'newPrice', 'profitInEuro'];
  @Input() currentState: TableState;
  @Input() dataSource: MatTableDataSource<Product>;
  @Input() invoiceDate: string;

  selection = new SelectionModel<Product>(true, []);
  printSelection: Product[];
  updateSelection: Product[];
  private print = new Button();
  private updateKefalaio = new Button();

  constructor( private service: StepperComponentService,
               private snackBarService: SnackBarService ) {}

  ngOnInit(): void {
    this.printSelection = [];
    this.updateSelection = [];
    if (this.currentState === TableState.UPDATE_PRICES) {
      this.setUpdatePricesState();
    } else if (this.currentState === TableState.PRINT_LABELS) {
      this.setPrintLabelsState();
    }
  }
  private hideAllButtons() {
    this.updateKefalaio.isVisible = false;
    this.print.isVisible = false;
  }

  updateStep2CheckBoxes(): void {
    this.updateSelection =
      this.dataSource.data.filter( x => x.isUpdateRequired === true);
    if ( this.updateSelection.length > 0 ) {
      this.updateKefalaio.isDisabled = false;
    }

  }

  checkboxLabel(row?: Product): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`;
  }

  addOrRemoveFromPrintSelection(product: Product) {
    this.addOrRemove(this.printSelection, product);
    this.enableOrDisableButton(this.printSelection.length, this.print);
  }

  private enableOrDisableButton( listLength: number, button: Button ) {
    if (listLength > 0) {
      button.isDisabled = false;
    } else {
      button.isDisabled = true;
    }
  }

  addOrRemoveFromUpdateSelection(product: Product) {
    this.addOrRemove(this.updateSelection, product);
    this.enableOrDisableButton(this.updateSelection.length, this.updateKefalaio);
  }

  private addOrRemove(products: Product[], product: Product) {
    const isProductSelected = products.includes(product);
    if (!isProductSelected) {
      products.push(product);
    } else {
      const index = products.indexOf(product, 0);
      products.splice(index, 1);
    }
  }

  setUpdatePricesState() {
    this.hideAllButtons();
    this.updateKefalaio.isVisible = true;
    this.updateKefalaio.isDisabled = true;
    this.displayedColumns =
      [
        'product', 
        'kefalaioPrice', 'newPrice', 'profitInEuro',
         'status', 'update'
      ];
  }

  setPrintLabelsState() {
    this.hideAllButtons();
    this.print.isVisible = true;
    this.print.isDisabled = true;
    this.displayedColumns =
      [
        'product',
        'kefalaioPrice', 'newPrice',
        'status', 'print'
      ];
  }

  updateDatabase() {
    const response =
      this.service
          .updateRetailPrices(this.updateSelection, this.invoiceDate);
    response.subscribe(() => {
      this.snackBarService.showInfo('Η ενημέρωση των τιμών έγινε επιτυχώς', 'Ok');
    });
    console.log(this.updateSelection);
  }

  downloadLabels() {
    const requestData = this.printSelection.map( (el: Product) => {
      return  {
        name : el.name,
        number: el.number,
        origin: el.origin,
        price: el.newPrice.toString()
      } as Label;
    });

    const dto = {
      labels: requestData
    } as DownloadLabelsDTO;

    this.service.downloadLabels(dto).subscribe((data: Blob) => {
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'labels.docx';
      link.click();
    });
    console.log(this.printSelection);
  }

  isCounterGreaterThanZero(element: Product) {
    return element.status.counter > 0;
  }

  getLine1ForTrendsColumn(elem: Product): string {
    return 'Προηγουμενες τιμές πώλησεις:';
  }

  getLine2ForTrendsColumn(elem: Product): string {
    return  elem.records.toString();
  }
}


