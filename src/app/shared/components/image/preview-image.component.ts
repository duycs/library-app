import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadService } from 'src/app/core/services/upload.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-preview-image',
  templateUrl: './preview-image.component.html',
  styleUrls: ['./preview-image.component.scss']
})
export class PreviewImageComponent{
  public imagePath;
  imgURL: any;
  public message: string;

  @Input() imageData: any;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  onClick() {
    this.notify.emit('Click from nested component');
  }

  constructor(private http: HttpClient,
    private alertService: AlertService,
    private uploadService: UploadService) {
  }

  preview(files) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);

    //notify data to parrent
    this.notify.emit(formData);

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
}

