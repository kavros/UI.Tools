import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SnackBarService } from '../common/snackBar/snackBar.service';
import { catchError } from 'rxjs/operators';
import { MappingsDialogData } from './mappings.dialog.component';

@Injectable({
    providedIn: 'root'
  })
export class MappingsDialogService {
    constructor(private httpClient: HttpClient,
                private snackBar: SnackBarService) {}

    public addOrUpdateMappingDialogData(mapping: MappingsDialogData): Observable<any> {
        return this
            .httpClient
            .put(
                'http://localhost:8080/addOrUpdateMappingDialogData',
                mapping
            )
            .pipe(
                catchError( (error) => {
                    this.snackBar.showError('Αποτυχία αποθήκευσης. Προσπαθήστε ξανά.', 'Ok') ;
                    return throwError('Failed to retrive response', error);
                })
            );
    }

    public getMappingDialogData(sCode: string): Observable<any> {
        return this.httpClient
                .get('http://localhost:8080/getMappingDialogData/'+sCode);
    }
}
