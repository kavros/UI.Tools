import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface IconStatus {
  name: string;
  color: string;
  label: string;
}

export interface Profit {
  value: number;
  class: string;
}

export interface Product {
  name: string;
  defaultProfit: Profit;
  purchasePrice: number;
  kefalaioPrice: number;
  newPrice: number;
  profitInEuro: number;
  status: IconStatus;
}

export class Button {
  public isVisible: boolean;
  public isDisabled: boolean;
}

enum State {
  UPDATE_PRICES = 2,
  PRINT_LABELS = 3
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
  @Input() currentState: State;
  @Input() dataSource: MatTableDataSource<Product>;
  selection = new SelectionModel<Product>(true, []);
  printSelection: Product[];
  updateSelection: Product[];
  private print = new Button();
  private updateKefalaio = new Button();
  private profitColumnColor: string;

  ngOnInit(): void {
    this.printSelection = [];
    this.updateSelection = [];
    if (this.currentState === State.UPDATE_PRICES) {
      this.profitColumnColor = 'black';
      this.setUpdatePricesState();
    } else if (this.currentState === State.PRINT_LABELS) {
      this.profitColumnColor = 'black';
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
    this.enableOrDisableButton(this.updateSelection.length, this.updateKefalaio);
  }

  addOrRemoveFromPrintSelection(product: Product) {
    this.addOrRemove(this.printSelection, product);
    this.enableOrDisableButton(this.printSelection.length, this.print);
  }

  private enableOrDisableButton( listLength: number, button: Button ){
    if (listLength > 0) {
      button.isDisabled = false;
    } else {
      button.isDisabled = true;
    }
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
    console.log(this.currentState);
    if (profit == null ) { return; }
    el.profitInEuro = Number(profit);
    el.newPrice = el.purchasePrice + el.profitInEuro;
    //TODO: update Status
  }

  setUpdatePricesState() {
    this.hideAllButtons();
    this.updateKefalaio.isVisible = true;
    this.updateKefalaio.isDisabled = true;
    this.displayedColumns =
        [  'product', 'defaultProfit', 'purchasePrice', 'kefalaioPrice', 'newPrice', 'profitInEuro', 'status', 'update'];
  }

  setPrintLabelsState() {
    this.hideAllButtons();
    this.print.isVisible = true;
    this.print.isDisabled = true;
    this.displayedColumns =
      ['product', 'defaultProfit', 'purchasePrice', 'kefalaioPrice', 'newPrice', 'profitInEuro', 'print'];
  }

  setUpdateProfitsState() {
    this.hideAllButtons();
    this.displayedColumns =
      ['product', 'defaultProfit', 'purchasePrice', 'kefalaioPrice', 'newPrice', 'profitInEuro'];
  }

  updateDatabase() {
    console.log(this.updateSelection);
  }

  printLabels() {
    console.log(this.printSelection);
  }
}


