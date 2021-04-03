import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SnackBarService } from 'src/app/common/snackBar/snackBar.service';
import { StepperDialogComponent, StepperDialogData } from '../stepper/stepper-dialog/stepper.dialog.component';
import { MappingsService } from './services/mappings.service';


export class MappingsElement {
  sName: string;
  sCode: string;
  pNames: string[];
  hasValidated: boolean;
}

@Component({
  selector: 'app-mappings',
  templateUrl: './mappings.component.html',
  styleUrls: ['./mappings.component.css']
})
export class MappingsComponent implements OnInit {

  @Input() isImportStep: boolean = false;
  @Input() dataSource : MatTableDataSource<MappingsElement>;
  @Output() onMappingChange =  new EventEmitter();
  @Output() onValidatioCompleted = new EventEmitter();

  displayedColumns: string[];
  
  constructor(private mappingsService: MappingsService,
              public dialog: MatDialog,
              private snackBar: SnackBarService) { }

  ngOnInit(): void {
    if(this.isImportStep){
      this.displayedColumns = ['sName','sCode', 'pNames','update'];
    }else{
      this.displayedColumns = ['sName','sCode', 'pNames'];
      this.loadData();
    }
  }

  loadData() {
    this.dataSource = new MatTableDataSource<MappingsElement>();
    this.mappingsService
        .getMappings()
        .subscribe( (data: MappingsElement[]) => {
            this.dataSource.data = data;
        });
  }

  openDialog(pName: string) {
    const newMapping = {
      pName: pName,
      tittle: 'Αλλαγή κανόνα και αντιστοίχισης'
    } as StepperDialogData;
    
    const dialogRef = this.dialog.open(StepperDialogComponent, {
      width: '290px',
      data: newMapping
    });      
    

    dialogRef.afterClosed().subscribe( async result  => {    
      if (result?.event === 'Save') {   
        if(this.isImportStep) {
          this.onMappingChange.emit();
        }else{
          await this.delay(2000); // wait for update to complete
          this.dataSource.data = [];  
          this.loadData();
        }
      }
    });
  }
  
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  onDeleteMapping(row:MappingsElement, pName:string){
    const msg = 'Θέλετε να διαγραφεί η αντιστοίχιση. ' + pName;
    if (confirm(msg)) {        
      this.mappingsService.deleteMapping(pName).subscribe(x=>{
        this.snackBar.showSuccessMsg('Επιτυχής διαγραφή αντιστοίχισης.');
        
        const index = row.pNames.indexOf(pName)
        if (index >= 0) {
          row.pNames.splice(index, 1);
        }
      })
    }
  }
  
  onValidate(element: MappingsElement){
    element.hasValidated = !element.hasValidated;

    if(this.allChecked()) {
      this.onValidatioCompleted.emit();
    }
  }

  allChecked(): boolean{
    return this.dataSource.data.every(x=> x.hasValidated === true);
  }
}
