import { Product } from 'src/app/data/interfaces/product.interface';

export class UploadFileDTO {
    data: Product[];
    errors: string[];
    warnings: string[];
    invoiceDate: string;
}
