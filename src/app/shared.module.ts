import { NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { PreviewImageComponent } from './shared/components/image/preview-image.component';
import { ImageUploadComponent } from './shared/components/upload/image-upload.component';
import { EbookUploadComponent } from './shared/components/upload/ebook-upload.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfViwerComponent } from './shared/components/viewer/pdf-viewer.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        PdfViewerModule
    ],
    declarations: [
        ImageUploadComponent,
        PreviewImageComponent,
        EbookUploadComponent,
        PdfViwerComponent,
    ],
    exports: [
        ImageUploadComponent,
        PreviewImageComponent,
        EbookUploadComponent,
        PdfViwerComponent,
    ]
})
export class SharedModule { }