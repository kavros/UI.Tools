import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Label } from 'src/app/stepper/import-page/dto/download.labels.dto';


@Component({
  selector: 'app-labels-dialog',
  templateUrl: './labels-dialog.component.html',
  styleUrls: ['./labels-dialog.component.css']
})
export class LabelsDialogComponent {

  constructor(public dialogRef: MatDialogRef<LabelsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public label: Label,) { }


  onCancel(): void {
    this.dialogRef.close({event:'Cancel'}); 
  }

  onSave(): void {
    this.dialogRef.close({event:this.label});
  }

}
