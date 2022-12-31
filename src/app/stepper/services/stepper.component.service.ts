import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ImportDTO } from 'src/app/stepper/import-page/dto/import-dto';
import { catchError, map } from 'rxjs/operators';
import { Product } from 'src/app/stepper/interfaces/product';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/common/snackBar/snackBar.service';
import { DownloadLabelsDTO } from '../import-page/dto/download.labels.dto';
import { StepperDialogData, StepperDialogComponent } from 'src/app/stepper/stepper-dialog/stepper.dialog.component';
import { APIs } from 'src/app/common/urls';


@Injectable({
  providedIn: 'root'
})
export class StepperComponentService {

  constructor(private httpClient: HttpClient,
              private dialog: MatDialog,
              private snackBar: SnackBarService) { }


  public downloadLabels(labels: DownloadLabelsDTO) {
    return this
            .httpClient
            .put(
              APIs.downloadLabels,
              labels,
              { responseType: 'blob' }
            ).pipe(
              catchError( () => {
                this.snackBar.showError('Αποτυχία λήψης ταμπελών.', 'Ok') ;
                return throwError('Failed to retrive response');
              })
            );
  }

  public downloadHistoryDoc() {
    return this
            .httpClient
            .get(
              APIs.downloadHistoryDoc,
              { responseType: 'blob' }
            ).pipe(
              catchError( () => {
                this.snackBar.showError('Αποτυχία λήψης ιστορικού.', 'Ok') ;
                return throwError('Failed to retrive response');
              })
            );
  }

  public importAndGetStepperData( uploadImageData: FormData ): Observable<ImportDTO> {
    return  this.httpClient
      .post<ImportDTO>(
        APIs.import,
        uploadImageData)
          .pipe(
            catchError(err => {
              return this.handleImportErrors(err);
            }),
            map( (res: ImportDTO ) => res));
  }


  private handleImportErrors( err: { status: number; error: ImportDTO; } ): Observable<never> {
    if (err.status === 400) {
      const responseData = err.error as ImportDTO;
      const products = responseData.errors[0].items;
      
      this.getSettingsFromUser(products);
    } else {
      this.snackBar.showError('Αποτυχία φόρτωσης αρχείου', 'Ok');
    }

    return throwError('Failed to retrive main table data');
  }

  private getSettingsFromUser(products: string[]) {
    if(products.length === 0){
      this.snackBar.showAndRemain('Παρακαλώ τραβήξτε το τιμολογιο ξανα.', 'κλείσιμο');
    }else{
      var p = products.pop();
      p = p.replace(']', '').trim();
      var ref = this.openMappingsDialog(p);
      ref.afterClosed().subscribe( ()=>{this.getSettingsFromUser(products);});
    }
  }

  private openMappingsDialog(productName: string): MatDialogRef<any> {
        const newMapping = {
          pName: productName,
          tittle: 'Εισαγωγή κανόνα και αντιστοίχισης'
        } as StepperDialogData;

        return this.dialog.open(StepperDialogComponent, {
          width: '290px',
          data: newMapping,
          disableClose: true
        });
  }

  public updateRetailPrices( data: Product[], date: string): Observable<any> {
    const enpointData = data.map( product => {
      return  {
                name: product.name,
                newPrice: product.getNewPrice(),
                sCode: product.sCode
              }; });

    const dto = {
      products: enpointData,
      invoiceDate: date
    };
    return  this.httpClient
                .put(
                  APIs.updatePrices,
                  dto
                );
  }
}
