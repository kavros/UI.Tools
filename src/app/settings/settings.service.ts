import { Setting } from '../data/interfaces/setting.interface';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { SnackBarService } from '../common/snackBar/snackBar.service';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    constructor(private httpClient: HttpClient,
                private snackBar: SnackBarService) {}

    public addSetting(setting: Setting): Observable<any> {

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

    public removeSetting(sCode: string): Observable<any> {
        return null;
    }

    public editSetting(setting: Setting): Observable<any> {
        return null;
    }
}
