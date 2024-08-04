import { Injectable } from "@angular/core";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: "root",
})
export class PdfService {
  generatePdf(data: any[], headers: string[], fileName: string) {
    const tableBody = data.map((x) => {
      return [x.product, x.suggestedQuantity] as string[];
    });

    const docDefinition = {
      content: [
        { text: "", style: "heaer" },
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

    pdfMake.createPdf(docDefinition).download(`${fileName}.pdf`);
  }
}
