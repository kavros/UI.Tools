import { Profit } from './profit.interface';
import { IconStatus } from './icon-status.interface';

export interface Product {
    name: string;
    defaultProfit: Profit;
    invoicePrice: number;
    retailPrice: number;
    newPrice: number;
    profitInEuro: number;
    profitPercentage: number;
    records: number[];
    status: IconStatus;
    kef5Code: string;
}
