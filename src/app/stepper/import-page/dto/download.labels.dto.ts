export interface Label {
    name: string;
    number: string;
    origin: string;
    price: string;
}

export class DownloadLabelsDTO {
    labels: Label[];
}
