import { Component, OnInit } from "@angular/core";
import { MydataService } from "./services/mydata.service";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";

import {
  CustomerDetails,
  MyDataDetails,
  SendInvoiceResponse,
} from "./models/sendInvoiceResponse";
import { PdfService } from "../orders/pdfService";

@Component({
  selector: "app-mydata",
  templateUrl: "./mydata.send.component.html",
  styleUrls: ["./mydata.send.component.css"],
})
export class MydataSendComponent implements OnInit {
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  myControl = new FormControl("");
  dropdownData: Invoice[];
  invoiceData: SendInvoiceResponse;
  businessDetails = [
    { field: "Επωνυμία", value: "ΤΣΑΒΟΛΑΚΗ ΑΝΝΑ" },
    { field: "Α.Φ.Μ.", value: "113173996" },
    { field: "Επάγγελμα", value: "οπωροπαντοπωλείο" },
    { field: "Δ.Ο.Υ.", value: "ΧΑΝΙΩΝ" },
    { field: "Διεύθυνση", value: "ΣΕΛΙΝΟΥ 122 - ΧΑΝΙΑ, T.K: 73131" },
  ];
  productListColumns: string[] = [
    "code",
    "description",
    "quantity",
    "mm",
    "price",
    "discount",
    "netValue",
    "vat",
    "vatAmount",
    "amount",
  ];
  myDataGridHeaders: string[] = ["Ημερομηνία", "ΜΑΡΚ", "Τρόπος Πληρωμής"];
  customerDetailsGridColumns: string[] = ["vatNumber", "name", "address"];
  mydataGridColumns: string[] = ["invoiceMark", "createdDate", "paymentMethod"];
  mydataGrid = new MatTableDataSource();
  productListGrid = new MatTableDataSource();
  customerDetailsGrid = new MatTableDataSource();
  qrUrl = "";
  sum = 0;

  constructor(
    private mydataService: MydataService,
    private _formBuilder: FormBuilder,
    private _pdfService: PdfService
  ) {}

  ngOnInit(): void {
    this.mydataService.getInvoices().subscribe((x) => {
      this.dropdownData = x;
      this.options = x.map((y) => y.documentId);
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(""),
        map((value) => this._filter(value || ""))
      );
    });
    this.firstFormGroup = this._formBuilder.group({});
    this.secondFormGroup = this._formBuilder.group({});
  }

  exportToPdf(): void {
    this._pdfService.generateInvoice(this.invoiceData);
  }

  sendInvoice() {
    var res = this.dropdownData.find(
      (x) => x.documentId === this.myControl.value
    );
    this.mydataService.sendInvoice(res).subscribe((x) => {
      this.invoiceData = x;
      this.productListGrid = new MatTableDataSource<any>(x.invoiceRows);
      this.mydataGrid = new MatTableDataSource<MyDataDetails>([
        x.myDataDetails,
      ]);
      this.customerDetailsGrid = new MatTableDataSource<CustomerDetails>([
        x.customerDetails,
      ]);
      this.qrUrl = x.myDataDetails.qrUrl;
      this.sum = x.invoiceRows.reduce((acc, val) => acc + val.amount || 0, 0);
    });
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
