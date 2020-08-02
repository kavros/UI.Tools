import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ImportDTO } from 'src/app/uploadFile/dto/upload-file-dto';
import { catchError, map } from 'rxjs/operators';
import { Product } from 'src/app/data/interfaces/product.interface';


@Injectable({
  providedIn: 'root'
})
export class StepperComponentService {

  constructor(private httpClient: HttpClient) { }

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

  private handleImportErrors ( err ): Observable<never> {
    if (err.status === 400) {

      const responseData = err.error as ImportDTO;
      //map( (responseData: ImportDTO ) => responseData);
      console.log(responseData.errors[0].code);
    }

    return throwError('Failed to retrive main table data');
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
