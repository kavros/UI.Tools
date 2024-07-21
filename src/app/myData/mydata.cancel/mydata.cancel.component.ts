import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { MydataService } from "../services/mydata.service";

@Component({
  selector: "app-mydata-cancel",
  templateUrl: "./mydata.cancel.component.html",
  styleUrls: ["./mydata.cancel.component.css"],
})
export class MydataCancelComponent implements OnInit {
  filteredOptions: Observable<string[]>;
  myControl = new FormControl("");
  options: string[] = [];
  successfulCancelation = null;
  constructor(private mydataService: MydataService) {}

  ngOnInit(): void {
    this.mydataService.getMyDataInvoices().subscribe((x) => {
      this.options = x;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(""),
        map((value) => this._filter(value || ""))
      );
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value || ""))
    );
  }

  cancelInvoice(): void {
    this.mydataService.cancelInvoice(this.myControl.value).subscribe((res) => {
      if (res !== null) {
        this.successfulCancelation = false;
        //show error message
      } else {
        this.successfulCancelation = true;
        //show message
      }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
