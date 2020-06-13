import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UploadFileDTO } from 'src/app/uploadFile/dto/upload-file-dto';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StepperComponentService {

  constructor(private httpClient: HttpClient) { }

  public sendGetTableDataRequest( uploadImageData: FormData ): Observable<UploadFileDTO> {


    return  this.httpClient
      .post<UploadFileDTO>(
        'http://localhost:8080/upload',
        uploadImageData)
          .pipe(
            catchError(err => {
              return throwError('Failed to retrive main table data');
            }),
            map( (res: UploadFileDTO ) => res));
  }


}
