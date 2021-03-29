import { Component, EventEmitter, Output } from '@angular/core';
import { StepperComponentService } from '../services/stepper.component.service';
import { ImportDTO } from './dto/import-dto';
import { Observable } from 'rxjs';
import { SnackBarService } from '../../common/snackBar/snackBar.service';

@Component({
  selector: 'import',
  templateUrl: './import.component.html',
  styleUrls: [ './import.component.scss' ]
})
export class ImportComponent  {
  files: any[] = [];
  constructor(private service: StepperComponentService,
              private snackBarService: SnackBarService) { }
  @Output() eventUpdateDataSource =  new EventEmitter();
  lastEvent: any;
  
  onFileDropped($event) {
    this.lastEvent = $event
    this.prepareFilesList($event);
    this.import($event[0]);
  }

  onFileBrowseHandler(files) {
    this.prepareFilesList(files);
    this.import(files[0]);
  }

  importAgain() {
    this.prepareFilesList(this.lastEvent);
    this.import(this.lastEvent[0]);
  }

  private import(selectedFile){
    const invoiceData = new FormData();
    invoiceData.append('pdfFile', selectedFile, selectedFile.name);
    const response = this.service.importAndGetStepperData(invoiceData);
    this.handleResponse(response);
  }

  private handleResponse(response: Observable < ImportDTO >) {
    response.subscribe((res) => {
      const hasErrors = res.errors.length > 0;
     
      if (hasErrors ) {
          const msg =  res.errors.toString();
          this.snackBarService.showAndRemain(msg, 'κλείσιμο');
      } else {
        this.snackBarService.showSuccessMsg('Eπιτυχής φόρτωση αρχείου.');
      }
      this.eventUpdateDataSource.emit(res);
    });
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
  }


  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }


  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  formatBytes(bytes, decimals=0) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
