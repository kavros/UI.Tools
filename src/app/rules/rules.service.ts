import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { SnackBarService } from '../common/snackBar/snackBar.service';
import { Rule } from './rules-dialog/rule-dialog.component';
import { RuleTableRow } from './rules.component';
import { APIs } from '../common/urls';

@Injectable({
    providedIn: 'root'
})
export class RulesService {

    constructor(private httpClient: HttpClient,
                private snackBar: SnackBarService) {}

    public addOrUpdateRule(setting: RuleTableRow): Observable<any> {

        return  this.httpClient
                .post(
                    APIs.addOrUpdateRule,
                    setting
                )
                .pipe(
                    catchError(() => {
                        this.snackBar.showError('Αποτυχία καταχώρησης νέου κανόνα. Προσπαθήστε ξανά', 'Ok');
                        return throwError('Failed to add setting');
                    })
                );
    }

    public deleteRule(rule: Rule): Observable<any> {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
            body: rule
          };
        return this.httpClient
            .delete(
                APIs.deleteRule,
                options
            )
            .pipe(
                catchError(() => {
                    this.snackBar.showError('Αποτυχία διαγραφής κανόνα.', 'Ok');
                    return throwError('Failed to delete rule');
                })
            );
    }

    public getRules(): Observable<RuleTableRow[]> {
        return this.httpClient
                .get<RuleTableRow[]>(APIs.getRulesTable)
                .pipe(
                    catchError(() => {
                        this.snackBar.showError('Αποτυχία φόρτωσης κανόνων.', 'Ok');
                        return throwError('Failed to load rules');
                    }));
    }
    public getSName(sCode: string): Observable<RuleTableRow> {
        return this.httpClient
                .get<RuleTableRow>(
                    APIs.getSName + sCode)
                .pipe(
                    catchError(() => {
                        return throwError('Failed to load new rule');
                    }));
    }
}
