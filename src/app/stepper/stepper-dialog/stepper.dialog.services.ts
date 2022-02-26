import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SnackBarService } from '../../common/snackBar/snackBar.service';
import { catchError } from 'rxjs/operators';
import { StepperDialogData } from './stepper.dialog.component';
import { APIs } from 'src/app/common/urls';

@Injectable({
    providedIn: 'root'
  })
export class MappingsDialogService {
    constructor(private httpClient: HttpClient,
                private snackBar: SnackBarService) {}

    public addOrUpdateStepperDialogData(mapping: StepperDialogData): Observable<any> {
        return this
            .httpClient
            .put(
                APIs.saveStepperDialogData,
                mapping
            )
            .pipe(
                catchError( (error) => {
                    this.snackBar.showError('Αποτυχία αποθήκευσης. Προσπαθήστε ξανά.', 'Ok') ;
                    return throwError('Failed to retrive response', error);
                })
            );
    }

    public getStepperDialogData(sCode: string): Observable<any> {
        return this.httpClient
                .get(APIs.getStepperDialogData + sCode);
    }
}
