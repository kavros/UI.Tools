export interface Label {
    name: string;
    number: string;
    origin: string;
    sCode: string;
}

export class DownloadLabelsDTO {
    labels: Label[];
}
