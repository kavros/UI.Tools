import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ImportDTO } from 'src/app/uploadFile/dto/import-dto';
import { catchError, map } from 'rxjs/operators';
import { Product } from 'src/app/data/interfaces/product.interface';
import { Setting } from 'src/app/data/interfaces/setting.interface';
import { SettingsDialogComponent } from 'src/app/settings/settings-dialog/settings-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class StepperComponentService {

  constructor(private httpClient: HttpClient,
              public dialog: MatDialog) { }

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

  private handleImportErrors( err ): Observable<never> {
    if (err.status === 400) {

      const responseData = err.error as ImportDTO;
      console.log(responseData.errors[0].code);
      console.log(responseData.errors[0].msg);
      const productName = (responseData.errors[0].msg)
                          .split(':')[1]
                          .trim();
      this.openAddSettingDialog(productName);
    }

    return throwError('Failed to retrive main table data');
  }


  private openAddSettingDialog(productName: string): void{

    console.log(productName);
    const newProduct = {
      name: productName,
      profitPercentage: 0,
      minimumProfit : 0,
      sCode: ''
    }as Setting;

    this.dialog.open(SettingsDialogComponent, {
      width: '250px',
      data: {title: 'Καταχώρηση νέου κανόνα', product: newProduct},
    });
    console.log(newProduct);
  }

  public updateRetailPrices( data: Product[], date: string): Observable<any> {
    const enpointData = data.map( function(product) {
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
