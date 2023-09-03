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
    });
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
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  exportPdf() {
    const title = 'Order';
    this.pdfService.generatePdf(this.selection.selected, ["Προϊόν", "Ποσότητα αγοράς"], title);
  }

  removeRow(product: string) {
    this.dataSource.data = this.dataSource.data.filter(u => u.product !== product);

    // remove item from selected items list
    var selectedItem = this.selection.selected.find(x => x.product === product);
    if(selectedItem)
      this.selection.toggle(selectedItem);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
