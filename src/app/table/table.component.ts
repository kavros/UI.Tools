import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/data/interfaces/product.interface';
import { TableState } from './enums/table-state.enum';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  selection = new SelectionModel<Product>(true, []);
  printSelection: Product[];
  updateSelection: Product[];
  private print = new Button();
  private updateKefalaio = new Button();

  constructor(public dialog: MatDialog) {}

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

  checkboxLabel(row?: Product): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`;
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

  updateNewPrice(el: Product, newPrice: string) {
    if (newPrice == null ) { return; }
    el.newPrice = Number(newPrice);
    el.profitInEuro = el.newPrice - (el.purchasePrice * 1.13);
    //TODO: update Status, round number
  }

  updateProfit(el: Product, profit: string) {
    if (profit == null ) { return; }
    el.profitInEuro = Number(profit);
    el.newPrice = (el.purchasePrice * 1.13) + el.profitInEuro;
    //TODO: update Status, round number
  }
  setUpdatePricesState() {
    this.hideAllButtons();
    this.updateKefalaio.isVisible = true;
    this.updateKefalaio.isDisabled = true;
    this.displayedColumns =
      [
        'product', 'defaultProfit', 'purchasePrice',
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
    console.log(this.updateSelection);
  }

  printLabels() {
    console.log(this.printSelection);
  }

  openDialog() {
    console.log("open dialog");
    this.dialog.open(DialogComponent, {
      width: '250px',
      data: {title: 'title', content: 'content'}
    });

  }
}


