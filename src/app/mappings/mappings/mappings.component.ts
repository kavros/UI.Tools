import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SnackBarService } from 'src/app/common/snackBar/snackBar.service';
import { RulesService } from 'src/app/rules/rules.service';


export interface MappingsElement {
  sName: string;
  sCode: string;
  pNames: string[];
}

const ELEMENT_DATA: MappingsElement[] = [
  {sName: "1", pNames: ['Hydrogen'], sCode:"123"},
  {sName: "2", pNames:['Helium'], sCode:"123" }
];

@Component({
  selector: 'app-mappings',
  templateUrl: './mappings.component.html',
  styleUrls: ['./mappings.component.css']
})
export class MappingsComponent implements OnInit {

  displayedColumns: string[] = ['sName','sCode', 'pNames'];
  dataSource : MatTableDataSource<MappingsElement>;
  constructor(private rulesService: RulesService,
              private snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<MappingsElement>();
    this.loadData();
  }

  loadData() {
    this.rulesService
        .getRules()
        .subscribe( (data: MappingsElement[]) => {
            this.dataSource.data = data;
        });
  }

  onDeleteMapping(row:MappingsElement, pName:string){
    this.rulesService.deleteMapping(pName).subscribe(x=>{
      this.snackBar.showSuccessMsg('Επιτυχής διαγραφή αντιστοίχισης.');
      const index = row.pNames.indexOf(pName)

      if (index >= 0) {
        row.pNames.splice(index, 1);
      }
    })
  }

}
