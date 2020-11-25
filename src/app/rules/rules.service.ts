import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { SnackBarService } from '../common/snackBar/snackBar.service';
import { Rule } from './rules-dialog/rule-dialog.component';
import { RuleTableRow } from './rules.component';


export interface RulesDTO {
    profitPercentage: number;
    minProfit: number;
    sCode: string;
    sName: string;
}

@Injectable({
    providedIn: 'root'
})
export class RulesService {

    constructor(private httpClient: HttpClient,
                private snackBar: SnackBarService) {}

    public addRule(setting: Rule): Observable<any> {

        return  this.httpClient
                .post(
                    'http://localhost:8080/addOrUpdateRule',
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

    /*public deleteRule(rule: Rule): Observable<any> {
        this.httpClient
            .delete('http://localhost:8080/deleteRule',
                rule
                );
        return null;
    }*/

    public getRules(): Observable<RuleTableRow[]> {
        return this.httpClient
                .get<RuleTableRow[]>('http://localhost:8080/getRulesTable')
                .pipe(
                    catchError(() => {
                        this.snackBar.showError('Αποτυχία φόρτωσης κανόνων.', 'Ok');
                        return throwError('Failed to load rules');
                    }));
    }
}
