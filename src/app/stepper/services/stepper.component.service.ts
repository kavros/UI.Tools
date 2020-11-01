import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ImportDTO } from 'src/app/stepper/import-page/dto/import-dto';
import { catchError, map } from 'rxjs/operators';
import { Product } from 'src/app/stepper/interfaces/product';
import { Setting } from 'src/app/common/interfaces/setting.interface';
import { SettingsDialogComponent } from 'src/app/common/settings-dialog/settings-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/common/snackBar/snackBar.service';
import { DownloadLabelsDTO } from '../import-page/dto/download.labels.dto';


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
              'http://localhost:8080/downloadLabels',
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
              'http://localhost:8080/downloadHistoryDoc',
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
        'http://localhost:8080/import',
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
      console.log(responseData);
      const products = (responseData.errors[0].msg)
                          .split('[')[1]
                          .split(',');
      products.forEach( p => {
        p = p.replace(']', '').trim();
        this.openAddSettingDialogFor(p);
      });
    } else {
      this.snackBar.showError('Αποτυχία φόρτωσης αρχείου', 'Ok');
    }

    return throwError('Failed to retrive main table data');
  }

  private openAddSettingDialogFor(productName: string): void {
    const newSetting = {
      sName: productName,
      profitPercentage: 0,
      minProfit : 0,
      sCode: ''
    }as Setting;

    this.dialog.open(SettingsDialogComponent, {
      width: '250px',
      data: {title: 'Καταχώρηση νέου κανόνα', setting: newSetting},
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
                  'http://localhost:8080/updatePrices',
                  dto
                );
  }
}
