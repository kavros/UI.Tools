import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Label } from '../stepper/import-page/dto/download.labels.dto';
import { StepperComponentService } from '../stepper/services/stepper.component.service';
import { LabelsDialogComponent } from './labels-dialog/labels-dialog.component';


@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css']
})
export class LabelsComponent implements OnInit {
  dataSource: MatTableDataSource<Label>;
  displayedColumns: string[] =
  ['name', 'origin', 'number', 'sCode', 'action', 'delete'];

  constructor(public dialog: MatDialog,
    private service: StepperComponentService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Label>();
  }
  
  onAdd(): void {
    const input =
    {
      name: '',
      sCode: '',
      origin: '',
      number : ''
    } as Label;
    
    this.openDialog(input);      
  }

  private openDialog(input: Label) {
    const dialogRef = this.dialog.open(LabelsDialogComponent, {
      width: '280px',
      data: input
    });

    dialogRef.afterClosed().subscribe( async result => {
      if(result?.event === 'Cancel' ) {
        return;
      }
      const data = this.dataSource.data;
      data.push(result.event);
      this.dataSource.data = data;
      
    });
  }
  
  onDownloadLabels(){
    this.service
        .downloadLabels({labels: this.dataSource.data})
        .subscribe( (data: Blob) => {
          const downloadURL = window.URL.createObjectURL(data);
          const link = document.createElement('a');
          link.href = downloadURL;
          link.download = 'labels.pdf';
          link.click();
        }); 
  }

  onDelete(label: Label) {

  }

  onEdit(label: Label) {

  }
}
