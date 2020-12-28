import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class InputConverterService {
    fixFormat(val: string): number {
        if ( val.toString().indexOf(',') !== -1 ){
        val = val.replace(',', '.');
        }
        return Number(val);
    }
}