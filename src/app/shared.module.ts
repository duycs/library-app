import { NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { PreviewImageComponent } from './shared/components/image/preview-image.component';
import { ImageUploadComponent } from './shared/components/upload/image-upload.component';
import { EbookUploadComponent } from './shared/components/upload/ebook-upload.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfViwerComponent } from './shared/components/viewer/pdf-viewer.component';
import { FormsModule } from '@angular/forms';
import { RecommendedComponent } from './modules/recommended/recommended.component';
import { NgMasonryGridModule } from 'ng-masonry-grid';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        PdfViewerModule,
        NgMasonryGridModule
    ],
    declarations: [
        ImageUploadComponent,
        PreviewImageComponent,
        EbookUploadComponent,
        PdfViwerComponent,
        RecommendedComponent
    ],
    exports: [
        ImageUploadComponent,
        PreviewImageComponent,
        EbookUploadComponent,
        PdfViwerComponent,
        RecommendedComponent
    ]
})
export class SharedModule { }