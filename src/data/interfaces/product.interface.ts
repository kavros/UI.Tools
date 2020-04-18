import { Profit } from './profit.interface';
import { IconStatus } from './icon-status.interface';

export interface Product {
    name: string;
    defaultProfit: Profit;
    purchasePrice: number;
    kefalaioPrice: number;
    newPrice: number;
    profitInEuro: number;
    status: IconStatus;
}
