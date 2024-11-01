import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, Input } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Product } from "src/app/stepper/interfaces/product";
import { TableState } from "./enums/table-state.enum";
import { SnackBarService } from "../../common/snackBar/snackBar.service";
import { StepperComponentService } from "../services/stepper.component.service";
import {
  DownloadLabelsDTO,
  Label,
} from "../import-page/dto/download.labels.dto";

export class Button {
  public isVisible: boolean;
  public isDisabled: boolean;
}

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
  @Input() ELEMENT_DATA: Product[];
  displayedColumns: string[] = [
    "product",
    "defaultProfit",
    "purchasePrice",
    "kefalaioPrice",
    "newPrice",
    "profitInEuro",
  ];
  @Input() currentState: TableState;
  @Input() dataSource: MatTableDataSource<Product>;
  @Input() invoiceDate: string;

  selection = new SelectionModel<Product>(true, []);
  print = new Button();
  updateKefalaio = new Button();

  constructor(
    private service: StepperComponentService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
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
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.name
    }`;
  }

  addOrRemoveFromPrintSelection(product: Product) {
    product.printLabel = !product.printLabel;
    const printIndex = this.dataSource.data.findIndex(
      (x) => x.printLabel === true
    );
    if (printIndex === -1) {
      this.print.isDisabled = true;
    } else {
      this.print.isDisabled = false;
    }
  }

  updateDownloadButton(): void {
    const updateIndex = this.dataSource.data.findIndex(
      (x) => x.isUpdateRequired === true
    );
    if (updateIndex === -1) {
      this.updateKefalaio.isDisabled = true;
    } else {
      this.updateKefalaio.isDisabled = false;
    }
  }

  addOrRemoveFromUpdateSelection(product: Product) {
    product.isUpdateRequired = !product.isUpdateRequired;
    this.updateDownloadButton();
  }

  setUpdatePricesState() {
    this.hideAllButtons();
    this.updateKefalaio.isVisible = true;
    this.updateKefalaio.isDisabled = true;
    this.displayedColumns = [
      "product",
      "newPrice",
      "kefalaioPrice",
      "profitInEuro",
      "status",
      "update",
    ];
  }

  setPrintLabelsState() {
    this.hideAllButtons();
    this.print.isVisible = true;
    this.print.isDisabled = true;
    this.displayedColumns = ["product", "status", "print"];
  }

  updateDatabase() {
    const updateSelection = this.dataSource.data.filter(
      (x) => x.isUpdateRequired === true
    );

    const response = this.service.updateRetailPrices(
      updateSelection,
      this.invoiceDate
    );
    response.subscribe(() => {
      this.snackBarService.showSuccessMsg(
        "Η ενημέρωση των τιμών έγινε επιτυχώς"
      );
    });
    console.log(updateSelection);
  }

  downloadLabels() {
    const printSelection = this.dataSource.data.filter(
      (x) => x.printLabel === true
    );
    const requestData = printSelection.map((el: Product) => {
      return {
        name: el.name,
        number: el.number,
        origin: el.origin,
        sCode: el.sCode,
      } as Label;
    });

    const dto = {
      labels: requestData,
    } as DownloadLabelsDTO;

    this.service.downloadLabels(dto).subscribe((data: Blob) => {
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = downloadURL;
      link.download = "labels.pdf";
      link.click();
    });
    console.log(printSelection);
  }

  isCounterGreaterThanZero(element: Product) {
    return element.status.counter > 0;
  }

  getLine1ForTrendsColumn(elem: Product): string {
    return "Προηγουμενες προτεινόμενες τιμές:";
  }

  getLine2ForTrendsColumn(elem: Product): string {
    return elem.records.toString();
  }
}
