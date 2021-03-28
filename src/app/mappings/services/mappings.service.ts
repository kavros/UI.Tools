import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { SnackBarService } from "src/app/common/snackBar/snackBar.service";
import { MappingsElement } from "../mappings.component";

@Injectable({
    providedIn: 'root'
})
export class MappingsService {

    constructor(private httpClient: HttpClient,
        private snackBar: SnackBarService) {}

    public getMappings(): Observable<MappingsElement[]> {
        return this.httpClient
                .get<MappingsElement[]>('http://localhost:8080/getMappings')
                .pipe(
                    catchError(() => {
                        this.snackBar.showError('Αποτυχία φόρτωσης αντιστοιχίσεων.', 'Ok');
                        return throwError('Failed to load rules');
                    }));
    }

    public deleteMapping(name: string): Observable<any> {
        const dto = {
            pName: name
        }
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
            body: dto
        };
        return this.httpClient
                .delete(
                    'http://localhost:8080/deleteMapping',
                    options
                ).pipe(catchError(() => {
                    this.snackBar.showError('Αποτυχία διαγραφής αντιστοίχισης.', 'Ok');
                    return throwError('Failed to delete mapping');
                }));
    }
}