import { IconStatus } from '../stepper/interfaces/icon-status.interface';
import { Product } from '../stepper/interfaces/product';

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
    invoicePrice: 1.5, retailPrice: 1.20,
    status: this.raisePriceIcon, isUpdateRequired: true
    } as Product,
    {
    name: 'Πατάτες', defaultProfit: { value: 10, class: 'line-through'}, invoicePrice: 1.1,
    retailPrice: 1.80,
    status: this.decreasePriceIcon, isUpdateRequired: false/*lens*/
    } as Product,
    {
    name: 'Φράουλες', defaultProfit: { value: 10, class: 'line-through'}, invoicePrice: 1.1,
    retailPrice: 1.80,
    status: this.decreasePriceIcon, isUpdateRequired: false
    } as Product,
    {
    name: 'Μήλα', defaultProfit: { value: 10, class: 'line-through'}, invoicePrice: 1.12,
    retailPrice: 1.76,
    status: this.noActionIcon, isUpdateRequired: false
    } as Product
];

}
