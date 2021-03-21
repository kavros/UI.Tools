import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/common/snackBar/snackBar.service';
import { MappingsService } from '../services/mappings.service';

export interface MappingsDialogOption {
  name: string,
  sCode: string
}

export interface MappingsDialogData {
  pName: string,
  sName: string,
  options: MappingsDialogOption[]
}

@Component({
  selector: 'app-mappings-dialog',
  templateUrl: './mappings-dialog.component.html',
  styleUrls: ['./mappings-dialog.component.css']
})
export class MappingsDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<any>,
              private mappingsService: MappingsService,
              private snackBar: SnackBarService) { }

  selectedOption: MappingsDialogOption;
    
  onSave() {
    this.mappingsService
        .updateMapping(this.data.pName, this.selectedOption.sCode)
        .subscribe( () => {
          this.snackBar.showSuccessMsg("Επιτυχής αλλαγή αντιστοίχισης")
        });
    this.dialogRef.close(
      {
        event:'Save',
        name: this.selectedOption.name,
        sCode: this.selectedOption.sCode
      }
      )
  }

  onSelectionChange(option) {
    this.selectedOption = option;
  }

  onCancel() {
    this.dialogRef.close({event:'Cancel'}); 
  }

}
