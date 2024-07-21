import { Injectable } from "@angular/core";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { SendInvoiceResponse } from "../myData/models/sendInvoiceResponse";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: "root",
})
export class PdfService {
  generatePdf(data: any[], headers: string[], title: string) {
    const tableBody = data.map((x) => {
      return [x.product, x.suggestedQuantity] as string[];
    });
    const docDefinition = {
      content: [
        { text: title, style: "header" },
        {
          table: {
            headerRows: 1,
            body: [headers, ...tableBody],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
    };

    pdfMake.createPdf(docDefinition).download(`${title}.pdf`);
  }

  generateInvoice(data: SendInvoiceResponse) {
    const productsHeaders: string[] = [
      "Κωδ.",
      "Περιγραφή",
      "Ποσότητα",
      "Μ.Μ",
      "Τιμή (€)",
      "Έκπτωση (€)",
      "Αξία (€)",
      "ΦΠΑ %",
      "ΦΠΑ (€)",
      "Τελ. Αξία (€)",
    ];
    var productsGrid = data.invoiceRows.map((x) => {
      return [
        x.code,
        x.description,
        x.quantity,
        x.mm,
        x.price,
        x.discount,
        x.netValue,
        x.vat,
        x.vatAmount,
        x.amount,
      ] as string[];
    });
    console.log(...productsGrid);
    var businessDetailsHeaders = [
      "Επωνυμία",
      "Α.Φ.Μ.",
      "Επάγγελμα",
      "Δ.Ο.Υ.",
      "Διεύθυνση",
    ];
    var businessDetailsGrid = [
      "ΤΣΑΒΟΛΑΚΗ ΑΝΝΑ",
      "113173996",
      "οπωροπαντοπωλείο",
      "ΧΑΝΙΩΝ",
      "ΣΕΛΙΝΟΥ 122 - ΧΑΝΙΑ, T.K: 73131",
    ];
    var myDataGridHeaders: string[] = ["Ημερομηνία", "ΜΑΡΚ", "Τρόπος Πληρωμής"];
    var myDataGridContent = [
      data.myDataDetails.createdDate,
      data.myDataDetails.invoiceMark,
      data.myDataDetails.paymentMethod,
    ];
    var customerDetailsHeaders = ["Α.Φ.Μ", "Επωνυμία", "Διεύθυνση"];
    var customerDetailsGrid = [
      data.customerDetails.vatNumber,
      data.customerDetails.address,
      data.customerDetails.name,
    ];
    var sum = data.invoiceRows.reduce((acc, val) => acc + val.amount || 0, 0);
    const docDefinition = {
      pageOrientation: "landscape",
      content: [
        { qr: data.myDataDetails.qrUrl, fit: 100, margin: [0, 0, 0, 10] },
        {
          table: {
            body: [businessDetailsHeaders, businessDetailsGrid],
          },
        },
        { text: "", margin: [0, 0, 0, 10] },
        {
          table: {
            headerRows: 1,
            body: [myDataGridHeaders, myDataGridContent],
          },
        },

        { text: "", margin: [0, 0, 0, 10] },
        {
          table: {
            headerRows: 1,
            body: [customerDetailsHeaders, customerDetailsGrid],
          },
        },
        ,
        { text: "", margin: [0, 0, 0, 10] },
        {
          table: {
            headerRows: 1,
            body: [productsHeaders, ...productsGrid],
          },
        },
        { text: "", margin: [0, 0, 0, 10] },
        { text: "Πληρωτέο (€): " + Math.round(sum * 100) / 100 },
      ],

      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
    };
    pdfMake.createPdf(docDefinition).download(`${"invoice"}.pdf`);
  }
}
