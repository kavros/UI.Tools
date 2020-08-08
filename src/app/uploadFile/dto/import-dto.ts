import { Product } from 'src/app/data/interfaces/product.interface';

interface Error {
    msg: string;
    code: ErrorCode;
}

enum ErrorCode {
    FAILED_TO_PARSE_DATE,
    FAILED_TO_RETRIEVE_SETTING
}

export class ImportDTO {
    data: Product[];
    errors: Error[];
    warnings: string[];
    invoiceDate: string;
}
