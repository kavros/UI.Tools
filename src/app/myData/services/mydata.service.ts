import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { SnackBarService } from "src/app/common/snackBar/snackBar.service";
import { KefalaioAPI } from "src/app/common/urls";
import { SendInvoiceResponse } from "../models/sendInvoiceResponse";

@Injectable({
    providedIn: 'root'
})
export class MydataService {
    constructor(private httpClient: HttpClient,
        private snackBar: SnackBarService) {}
    
    public getInvoices(): Observable<Invoice[]>{
        return this.httpClient
                    .get<Invoice[]>(KefalaioAPI.getAllInvoices)
                    .pipe(
                        catchError(() => {
                            this.snackBar.showError('Αποτυχία φόρτωσης.', 'Ok');
                            return throwError('Failed to load order');
                        })
                    )
    }

    public sendInvoice(data: Invoice): Observable<SendInvoiceResponse> {
        return this.httpClient
                    .post<SendInvoiceResponse>(KefalaioAPI.sendInvoice, data)
                    .pipe(
                        catchError(() => {
                            this.snackBar.showError('Αποτυχία αποστολής τιμολογιου στο MyData.', 'Ok');
                            return throwError('Failed to load order');
                        })
                    )
    }
}