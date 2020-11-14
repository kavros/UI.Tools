import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Mappings } from './mappings.dialog.component';
import { SnackBarService } from '../common/snackBar/snackBar.service';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class MappingsDialogService {
    constructor(private httpClient: HttpClient,
                private snackBar: SnackBarService) {}
    public saveMappings(mapping: Mappings): Observable<any> {
        return this
            .httpClient
            .put(
                'http://localhost:8080/addMapping',
                mapping
            )
            .pipe(
                catchError( (error) => {
                    this.snackBar.showError('Αποτυχία αποθήκευσης. Προσπαθήστε ξανά.', 'Ok') ;
                    return throwError('Failed to retrive response', error);
                })
            );
    }
}
