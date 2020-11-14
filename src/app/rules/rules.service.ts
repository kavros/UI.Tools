import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { SnackBarService } from '../common/snackBar/snackBar.service';
import { Rule } from './rules-dialog/rule-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class RulesService {

    constructor(private httpClient: HttpClient,
                private snackBar: SnackBarService) {}

    public addRule(setting: Rule): Observable<any> {

        return  this.httpClient
                .put(
                    'http://localhost:8080/addSetting',
                    setting
                )
                .pipe(
                    catchError(() => {
                        return this.handleErrors();
                    })
                );
    }

    private handleErrors(): Observable<never> {
        this.snackBar.showError('Αποτυχία καταχώρησης νέου κανόνα. Προσπαθήστε ξανά', 'Ok');
        return throwError('Failed to add setting');
    }

    public removeRule(sCode: string): Observable<any> {
        return null;
    }

    public editRule(setting: Rule): Observable<any> {
        return null;
    }
}
