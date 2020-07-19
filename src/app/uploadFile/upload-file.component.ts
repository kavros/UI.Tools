import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { StepperComponentService } from '../stepper/services/stepper.component.service';
import { UploadFileDTO } from './dto/upload-file-dto';
import { map } from 'rxjs/operators';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: [ './upload-file.component.scss' ]
})
export class UploadFileComponent  {
  files: any[] = [];
  constructor(private service: StepperComponentService,
              public dialog: MatDialog) { }
  @Output() eventUpdateDataSource =  new EventEmitter();

  onFileDropped($event) {
    this.prepareFilesList($event);
    const selectedFile = $event[0];

    const uploadInvoiceData = new FormData();
    uploadInvoiceData.append('pdfFile', selectedFile, selectedFile.name);
    const response = this.service.importAndGetStepperData(uploadInvoiceData);
    this.handleResponse(response);
  }

  handleResponse(response: Observable < UploadFileDTO >) {
    response.subscribe((res) => {
      const hasWarnings = res.warnings.length > 0;
      const hasErrors = res.errors.length > 0;

      if (hasWarnings || hasErrors ) {
          const msg =  res.warnings + '' + res.errors;
          this.dialog.open(DialogComponent, {
            width: '250px',
            data: {title: 'Problems', content: msg}
          });
      }
      this.eventUpdateDataSource.emit(res.data);
    });
  }

  fileBrowseHandler(files) {
    this.prepareFilesList(files);
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

 
  formatBytes(bytes, decimals) {
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
