import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { SnackBarService } from "src/app/common/snackBar/snackBar.service";
import { KefalaioAPI } from "src/app/common/urls";
import { SendInvoiceResponse } from "../models/sendInvoiceResponse";

@Injectable({
  providedIn: "root",
})
export class MydataService {
  constructor(
    private httpClient: HttpClient,
    private snackBar: SnackBarService
  ) {}

  public getInvoices(): Observable<Invoice[]> {
    return this.httpClient.get<Invoice[]>(KefalaioAPI.getAllInvoices).pipe(
      catchError(() => {
        this.snackBar.showError("Αποτυχία φόρτωσης.", "Ok");
        return throwError("Failed to load order");
      })
    );
  }

  public sendInvoice(data: Invoice): Observable<SendInvoiceResponse> {
    return this.httpClient
      .post<SendInvoiceResponse>(KefalaioAPI.sendInvoice, data)
      .pipe(
        catchError(() => {
          this.snackBar.showError(
            "Αποτυχία αποστολής τιμολογιου στο MyData.",
            "Ok"
          );
          return throwError("Failed to load order");
        })
      );
  }

  public cancelInvoice(documentId: string): Observable<string> {
    return this.httpClient
      .post<string>(KefalaioAPI.cancelInvoice, { DocumentId: documentId })
      .pipe(
        catchError(() => {
          this.snackBar.showError(
            "Αποτυχία ακύρωσης τιμολογιου στο MyData.",
            "Ok"
          );
          return throwError("Failed to cancel invoice");
        })
      );
  }

  public getMyDataInvoices(): Observable<string[]> {
    return this.httpClient.get<string[]>(KefalaioAPI.getMyDataInvoices).pipe(
      catchError(() => {
        this.snackBar.showError(
          "Αποτυχία φόρτωσης τιμολογίων στο MyData.",
          "Ok"
        );
        return throwError("Failed to cancel invoice");
      })
    );
  }
}
