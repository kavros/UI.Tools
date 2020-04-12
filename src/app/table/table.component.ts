import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface Product {
  name: string;
  defaultProfit: string;
  purchasePrice: number;
  kefalaioPrice: number;
  newPrice: number;
  profitInEuro: number;
  status: string;
}

export class ButtonStatus {
  public isVisible: boolean;
  public isDisabled: boolean;
}

enum State {
  UPDATE_PROFITS = 1,
  UPDATE_PRICES = 2,
  PRINT_LABELS = 3
}

/*const ELEMENT_DATA: Product[] = [
  { name: 'Ντοματες', defaultProfit: '10', purchasePrice: 1.5, kefalaioPrice: 1.20, newPrice: 1.65, profitInEuro: 0.15, status: '^'},
  { name: 'Πατάτες', defaultProfit: '10', purchasePrice: 1.1, kefalaioPrice: 1.80, newPrice: 1.21, profitInEuro: 0.11, status: '|!|'}
];*/
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() ELEMENT_DATA: Product[];
  displayedColumns: string[] =
    ['product', 'defaultProfit', 'purchasePrice', 'kefalaioPrice', 'newPrice', 'profitInEuro'];

  @Input() currentState: State;
  @Input() dataSource: MatTableDataSource<Product>;
  selection = new SelectionModel<Product>(true, []);
  printSelection: Product[];
  updateSelection: Product[];
  private print = new ButtonStatus();
  private updateKefalaio = new ButtonStatus();


  ngOnInit(): void {
    this.printSelection = [];
    this.updateSelection = [];
    if (this.currentState === 1) {
      this.setUpdateProfitsState();
    } else if(this.currentState === 2) {
      this.setUpdatePricesState();
    } else if(this.currentState === 3) {
      this.setPrintLabelsState();
    }
  }
  private hideAllButtons() {
    this.updateKefalaio.isVisible = false;
    this.print.isVisible = false;
  }

  checkboxLabel(row?: Product): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`;
  }

  debug() {
    console.log(this.updateSelection);
    this.displayedColumns = ['product', 'defaultProfit', 'purchasePrice', 'kefalaioPrice', 'newPrice', 'profitInEuro', 'status', 'update'];
  }

  addOrRemoveFromUpdateSelection(product: Product) {
    this.addOrRemove(this.updateSelection, product);
    if (this.updateSelection.length > 0) {
      this.updateKefalaio.isDisabled = false;
    } else {
      this.updateKefalaio.isDisabled = true;
    }
  }

  addOrRemoveFromPrintSelection(product: Product) {
    this.addOrRemove(this.printSelection, product);
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

  updateProfit(el: Product, profit: string) {
    if (profit == null) { return; }
    el.profitInEuro = Number(profit);
    el.newPrice = el.purchasePrice + el.profitInEuro;
    //TODO: update Status
    if (el.newPrice > el.kefalaioPrice) {
      el.status = '^';
    } else if (el.newPrice > el.kefalaioPrice) {
      el.status = '|!|';
    }
  }


  setUpdatePricesState() {
    this.hideAllButtons();
    this.updateKefalaio.isVisible = true;
    this.updateKefalaio.isDisabled = true;
    this.displayedColumns =
        ['product', 'defaultProfit', 'purchasePrice', 'kefalaioPrice', 'newPrice', 'profitInEuro', 'status', 'update'];
  }

  setPrintLabelsState() {
    this.hideAllButtons();
    this.print.isVisible = true;
    this.displayedColumns =
      ['product', 'defaultProfit', 'purchasePrice', 'kefalaioPrice', 'newPrice', 'profitInEuro', 'status', 'print'];
  }

  setUpdateProfitsState() {
    this.hideAllButtons();
    this.displayedColumns =
      ['product', 'defaultProfit', 'purchasePrice', 'kefalaioPrice', 'newPrice', 'profitInEuro'];
  }
}


