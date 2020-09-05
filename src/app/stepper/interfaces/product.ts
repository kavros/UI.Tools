import { Profit } from './profit.interface';
import { IconStatus } from './icon-status.interface';

export class Product {
    name: string;
    defaultProfit: Profit;
    invoicePrice: number;
    retailPrice: number;
    newPrice: number;
    profitInEuro: number;
    profitPercentage: number;
    records: number[];
    status: IconStatus;
    isUpdateRequired: boolean;

    constructor(data: Product) {
      this.name = data.name;
      this.defaultProfit = data.defaultProfit;
      this.invoicePrice = data.invoicePrice;
      this.retailPrice = data.retailPrice;
      this.newPrice = data.newPrice;
      this.profitInEuro = data.profitInEuro;
      this.profitPercentage = data.profitPercentage;
      this.records = data.records;
      this.status = data.status;
      this.isUpdateRequired = data.isUpdateRequired;
    }

    readonly upward  = {
      name: 'trending_up',
      color: 'red',
      label: 'Αύξηση',
      counter: 0
    } as IconStatus;

    readonly stable  = {
      name: 'trending_flat',
      color: 'green',
      label: 'Σταθερή',
      counter: 0
    } as IconStatus;

    downward = (): IconStatus  => {
      return {
        name: 'trending_down',
        color: 'orange',
        label: 'Μείωση',
        counter: this.getPriceDecreasesCounter()
      } as IconStatus;
    }

    updateTrendColumn(): void {
      if (this.newPrice > this.retailPrice) {
          this.status = this.upward;
          this.isUpdateRequired = true;
      } else if ( this.newPrice < this.retailPrice ) {
          this.status = this.downward();
          this.isUpdateRequired = this.status.counter === 3 ? true : false;
      } else if ( this.newPrice === this.retailPrice) {
          this.status = this.stable;
          this.isUpdateRequired = false;
      }
    }

    setNewPrice(newPrice: string): void {
      if (newPrice == null ) { return; }
      this.newPrice = this.getNumberFromString(newPrice);
      this.profitInEuro = this.newPrice - (this.invoicePrice * 1.13);
      this.profitInEuro = this.round(this.profitInEuro, 2);
      this.updateTrendColumn();
    }

    setProfit( profit: string): void {
      if (profit == null ) { return; }
      this.profitInEuro = this.getNumberFromString(profit);
      this.newPrice = (this.invoicePrice * 1.13) + this.profitInEuro;
      this.newPrice = this.round(this.newPrice, 2);
      this.updateTrendColumn();
    }

    private getNumberFromString(val: string): number {
      if ( val.toString().indexOf(',') !== -1 ){
        val = val.replace(',', '.');
      }
      return Number(val);
    }

    private round(value: number, precision: number) {
      const multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    }

    private getPriceDecreasesCounter(): number {
      let c = 0;
      this.records.forEach( oldRetailPrice => {
        if (this.retailPrice > oldRetailPrice  ) {
          c++;
        }
      });
      return c;
    }
}
