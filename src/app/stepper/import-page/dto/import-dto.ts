import { Product } from 'src/app/stepper/interfaces/product';

interface Error {
    msg: string;
    items: string[];
    code: ErrorCode;
}

enum ErrorCode {
    FAILED_TO_PARSE_DATE,
    FAILED_TO_RETRIEVE_SETTING
}

export class ImportDTO {
    data: Product[];
    errors: Error[];
    invoiceDate: string;
}
