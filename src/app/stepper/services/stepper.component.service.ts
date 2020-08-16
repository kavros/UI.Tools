import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ImportDTO } from 'src/app/stepper/import-page/dto/import-dto';
import { catchError, map } from 'rxjs/operators';
import { Product } from 'src/app/stepper/interfaces/product.interface';
import { Setting } from 'src/app/common/interfaces/setting.interface';
import { SettingsDialogComponent } from 'src/app/common/settings-dialog/settings-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/common/snackBar/snackBar.service';


@Injectable({
  providedIn: 'root'
})
export class StepperComponentService {

  constructor(private httpClient: HttpClient,
              private dialog: MatDialog,
              private snackBar: SnackBarService) { }

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
      const productName = (responseData.errors[0].msg)
                          .split(':')[1]
                          .trim();
      this.openAddSettingDialogFor(productName);
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
                newPrice: product.newPrice
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
