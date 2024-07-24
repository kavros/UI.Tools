export class InvoiceRow {
  public code: string;
  public description: string;
  public quantity?: number;
  public mm?: string;
  public price?: number;
  public discount?: number;
  public netValue?: number;
  public vat?: number; // Percentage
  public vatAmount?: number; // Euro
  public amount?: number;
}

export class CustomerDetails {
  public vatNumber: string;
  public name: string;
  public address: string;
}
export class MyDataDetails {
  public qrUrl: string;
  public invoiceMark?: number;
  public paymentMethod: string;
  public createdDate: string;
}
export class SendInvoiceResponse {
  public customerDetails: CustomerDetails;
  public invoiceRows: InvoiceRow[];
  public myDataDetails: MyDataDetails;
}
