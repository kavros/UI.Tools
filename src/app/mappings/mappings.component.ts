import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SnackBarService } from 'src/app/common/snackBar/snackBar.service';
import { MappingsDialogComponent, MappingsDialogData, MappingsDialogOption } from './mappings-dialog/mappings-dialog.component';
import { MappingsService } from './services/mappings.service';


export class MappingsElement {
  sName: string;
  sCode: string;
  pNames: string[];
}

@Component({
  selector: 'app-mappings',
  templateUrl: './mappings.component.html',
  styleUrls: ['./mappings.component.css']
})
export class MappingsComponent implements OnInit {

  @Input() isImportStep: boolean = false;
  @Input() dataSource : MatTableDataSource<MappingsElement>;
  selectorMappings: MappingsElement[];
  displayedColumns: string[] = ['sName','sCode', 'pNames'];
  
  constructor(private mappingsService: MappingsService,
              public dialog: MatDialog,
              private snackBar: SnackBarService) { }

  ngOnInit(): void {
    
    this.mappingsService
      .getMappings()
      .subscribe( (data: MappingsElement[]) => {
        this.selectorMappings = data;
      });
    
    if(!this.isImportStep){
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

  openDialog(el: MappingsElement, pName: string) {
   
    const dialogRef = this.dialog.open(MappingsDialogComponent, {
      width: '280px',
      data:
      {
        pName: pName,
        sName: el.sName,
        options: this.selectorMappings
                    .map(x=>
                      ({
                        name: x.sName, 
                        sCode:x.sCode
                      })) as MappingsDialogOption[]
      } as MappingsDialogData
    });      
    
    dialogRef.afterClosed().subscribe( async result => {
      if(result?.event === 'Cancel' ) {
        return;
      }else if(result?.event === 'Save'){
        console.log(result);
        const index = this.dataSource.data.findIndex(x=>x.sCode === result.sCode);
        this.dataSource.data.splice(index,1);
        this.dataSource.data.push({
          sCode: result.sCode,
          sName: result.name,
          pNames: [pName]
        }as MappingsElement)
        this.dataSource._updateChangeSubscription();
      }
      //await this.delay(2000); // wait for update to complete
      //this.dataSource.data = [];  
      //TODO: update table
      //this.loadData();
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

}
