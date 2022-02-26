import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { SnackBarService } from "src/app/common/snackBar/snackBar.service";
import { APIs } from "src/app/common/urls";
import { MappingsElement } from "../mappings.component";

@Injectable({
    providedIn: 'root'
})
export class MappingsService {

    constructor(private httpClient: HttpClient,
        private snackBar: SnackBarService) {}

    public getMappings(): Observable<MappingsElement[]> {
        return this.httpClient
                .get<MappingsElement[]>(APIs.getMappings)
                .pipe(
                    map(x => {
                        x.forEach(y => y.hasValidated = false );
                        return x;
                    }
                    ),
                    catchError(() => {
                        this.snackBar.showError('Αποτυχία φόρτωσης αντιστοιχίσεων.', 'Ok');
                        return throwError('Failed to load rules');
                    })
                );
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
                    APIs.deleteMapping,
                    options
                ).pipe(catchError(() => {
                    this.snackBar.showError('Αποτυχία διαγραφής αντιστοίχισης.', 'Ok');
                    return throwError('Failed to delete mapping');
                }));
    }
}