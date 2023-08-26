import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Item, Supplier } from "../orders.component";
import { HttpClient } from "@angular/common/http";
import { SnackBarService } from "src/app/common/snackBar/snackBar.service";
import { OrdersAPIs } from "src/app/common/urls";
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    constructor(private httpClient: HttpClient,
        private snackBar: SnackBarService) {}
        
    public getSuppliers(): Observable<Supplier[]>{
        return this.httpClient
                .get<Supplier[]>(OrdersAPIs.getSuppliers);   
    }

    public getOrder(settings: any): Observable<Item[]>{
        return this.httpClient
                    .post<Item[]>(OrdersAPIs.getOrder, settings)
                    .pipe(
                        catchError(() => {
                            this.snackBar.showError('Αποτυχία φόρτωσης παραγγελίας.', 'Ok');
                            return throwError('Failed to load order');
                        })
                    )
                    
    }
}