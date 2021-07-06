import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

export interface LabelsTableRow {
  pName: string;
  origin: string;
  number: string;
  sCode: string;
}

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css']
})
export class LabelsComponent implements OnInit {
  dataSource: MatTableDataSource<LabelsTableRow>;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  onAdd(): void {
    const input =
    {
      pName: '',
      sCode: '',
      origin: '',
      number : ''
    } as LabelsTableRow;
    
    this.openDialog(input, 'Δημιουργία νέας ετικέτας');      
  }

  openDialog(input:LabelsTableRow, msg: string) {
    /*const dialogRef = this.dialog.open(RuleDialog, {
      width: '280px',
      data:
      {
        title: msg,
        rule: input
      } as RuleDialogData
    });*/

    /*dialogRef.afterClosed().subscribe( async result => {
      if(result?.event === 'Cancel' ) {
        return;
      }
      await this.delay(2000); // wait for update to complete
      this.dataSource.data = [];  
      this.loadData();
      
    });*/
  }


}
