import { IconStatus } from './interfaces/icon-status.interface';
import { Product } from './interfaces/product.interface';

export class MockTableData {

raisePriceIcon = {
    name: 'trending_up',
    color: 'red',
    label: 'Αύξηση',
    counter: 1
} as IconStatus;

decreasePriceIcon = {
    name: 'trending_down',
    color: 'orange',
    label: 'Μείωση',
    counter: 3
} as IconStatus;

noActionIcon = {
    name: 'trending_flat',
    color: 'green',
    label: 'Σταθερή',
    counter: 1
} as IconStatus;

data: Product[] =  [
    {
    name: 'Ντοματες', defaultProfit: { value: 35, class: ''},
    purchasePrice: 1.5, kefalaioPrice: 1.20, newPrice: 2.28, profitInEuro: 0.59,
    status: this.raisePriceIcon, kef5Code: '123'
    } as Product,
    {
    name: 'Πατάτες', defaultProfit: { value: 10, class: 'line-through'}, purchasePrice: 1.1,
    kefalaioPrice: 1.80, newPrice: 1.74, profitInEuro: 0.5,
    status: this.decreasePriceIcon/*lens*/, kef5Code: '123'
    } as Product,
    {
    name: 'Φράουλες', defaultProfit: { value: 10, class: 'line-through'}, purchasePrice: 1.1,
    kefalaioPrice: 1.80, newPrice: 1.74, profitInEuro: 0.5,
    status: this.decreasePriceIcon/*lens*/, kef5Code: '123'
    } as Product,
    {
    name: 'Μήλα', defaultProfit: { value: 10, class: 'line-through'}, purchasePrice: 1.12,
    kefalaioPrice: 1.76, newPrice: 1.76, profitInEuro: 0.5,
    status: this.noActionIcon, kef5Code: '123'
    } as Product
];

}
