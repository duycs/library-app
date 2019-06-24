import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadService } from 'src/app/core/services/upload.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { File } from '../../models/file';
import { EventListener } from '@angular/core/src/debug/debug_node';

@Component({
  selector: 'app-ebook-upload',
  templateUrl: './ebook-upload.component.html',
  styleUrls: ['./ebook-upload.component.scss']
})
export class EbookUploadComponent {
  public file: File;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient,
    private alertService: AlertService,
    private uploadService: UploadService) {
  }

  upload(files) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);

    this.uploadService.uploadEbookToS3(formData)
      .subscribe(res => {
        console.log(res);
        this.file = res;
        this.alertService.showToastSuccess();
        this.notify.emit(this.file);
        //this.progress  = 100;
      }, (err) => {
        this.alertService.showToastError();
      });
  }
}

