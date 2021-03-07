import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mappings-dialog',
  templateUrl: './mappings-dialog.component.html',
  styleUrls: ['./mappings-dialog.component.css']
})
export class MappingsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  onSave() {
    console.log("save");
  }

  onCancel() {
    this.dialogRef.close({event:'Cancel'}); 
  }

}
