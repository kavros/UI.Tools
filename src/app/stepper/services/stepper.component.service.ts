import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepperComponentService {

  constructor(private httpClient: HttpClient) { }

  public sendGetTableDataRequest( uploadImageData: FormData ): Observable<HttpResponse<any>> {

    const response = this.httpClient
    .post(
        'http://localhost:8080/upload',
        uploadImageData,
        { observe: 'response' }
      );
    return response;
  }


}
