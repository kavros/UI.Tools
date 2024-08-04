import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { OrdersService } from "./services/orders.service";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { PdfService } from "./pdfService";
import { Stack } from "../common/stack";

export class OrderParam {
  nextOrderAfter: number;
  supplierCode: string;
  dateWindow: number;
}
export class Supplier {
  name: string;
  code: string;
}

export class Item {
  product: string;
  stock?: number;
  avgSalesPerDay?: number;
  suggestedQuantity?: number;
  isHidden?: boolean;
}

const COLUMNS_SCHEMA = [
  {
    key: "select",
    type: "select",
    label: "",
  },
  {
    key: "product",
    type: "text",
    label: "Προϊόν",
  },
  {
    key: "stock",
    type: "number",
    label: "Απόθεμα",
  },
  {
    key: "avgSalesPerDay",
    type: "number",
    label: "Πωλήσεις ανα μέρα",
  },
  {
    key: "suggestedQuantity",
    type: "number",
    label: "Ποσότητα αγοράς",
  },
  {
    key: "isEdit",
    type: "isEdit",
    label: "",
  },
];
@Component({
  selector: "orders-stepper",
  templateUrl: "orders.component.html",
  styleUrls: ["orders.component.css"],
})
export class OrdersComponent implements OnInit {
  //first step
  firstFormGroup: FormGroup;
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  myControl = new FormControl("");
  stack = new Stack<Item>();

  //second step
  secondFormGroup: FormGroup;
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource: MatTableDataSource<Item> = new MatTableDataSource<Item>();
  columnsSchema: any = COLUMNS_SCHEMA;

  //checkbox
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<Item>(
    this.allowMultiSelect,
    this.initialSelection
  );

  //paginator
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _formBuilder: FormBuilder,
    private ordersService: OrdersService,
    private pdfService: PdfService
  ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.ordersService.getSuppliers().subscribe((x: Supplier[]) => {
      this.options = x.map((y) => y.name + " (" + y.code + ")");
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(""),
        map((value) => this._filter(value || ""))
      );
    });

    this.firstFormGroup = this._formBuilder.group({
      nextOrderAfter: ["", Validators.required],
      strnDateWindow: ["30", Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      //secondCtrl: ['', Validators.required]
    });
  }
  loadOrder() {
    const param: OrderParam = {
      nextOrderAfter: this.firstFormGroup.value.nextOrderAfter,
      dateWindow: this.firstFormGroup.value.strnDateWindow,
      supplierCode: this.myControl.value.split("(")[1].split(")")[0],
    };
    this.ordersService.getOrder(param).subscribe((res) => {
      this.dataSource.data = res;
      this.dataSource.data.forEach((x) => (x.isHidden = false));
    });
  }

  reset() {
    this.selection.clear();
    this.paginator.pageIndex = 0;
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => {
          if (!row.isHidden) {
            this.selection.select(row);
          }
        });
  }

  exportPdf() {
    let dateTime = new Date();

    const fileName = "Order-" + dateTime.toString();
    this.pdfService.generatePdf(
      this.selection.selected,
      ["Προϊόν", "Ποσότητα αγοράς"],
      fileName
    );
  }

  showRow() {
    if (this.stack.size()) {
      const latestDeletedItem = this.stack.pop();
      const item = this.dataSource.data.find(
        (x) => x.product === latestDeletedItem.product
      );
      item.isHidden = false;
      this.paginator._changePageSize(this.paginator.pageSize);
    }
  }

  hideRow(product: string) {
    //hide item
    var item = this.dataSource.data.find((u) => u.product === product);
    item.isHidden = true;

    //add item to the stack so we can undo later
    this.stack.push(item);

    // remove item from selected items list
    this.toggleSelection(product);
  }

  increaseQuantity(product: string) {
    var item = this.dataSource.data.find((u) => u.product === product);
    item.suggestedQuantity++;
  }
  decreaseQuantity(product: string) {
    var item = this.dataSource.data.find((u) => u.product === product);
    item.suggestedQuantity--;
  }
  private toggleSelection(product: string) {
    var selectedItem = this.selection.selected.find(
      (x) => x.product === product
    );
    if (selectedItem) {
      this.selection.toggle(selectedItem);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
