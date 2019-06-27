import { NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { PreviewImageComponent } from './shared/components/image/preview-image.component';
import { ImageUploadComponent } from './shared/components/upload/image-upload.component';
import { EbookUploadComponent } from './shared/components/upload/ebook-upload.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfViwerComponent } from './shared/components/viewer/pdf-viewer.component';
import { FormsModule } from '@angular/forms';
import { BooksRecommendedComponent } from './modules/recommended/books-recommended.component';
import { NgMasonryGridModule } from 'ng-masonry-grid';
import { TagInputModule } from 'ngx-chips';
import { TagComponent } from './shared/components/tag/tag.component';
import { TagAutoCompleteComponent } from './shared/components/chips/tag-autocomplete.component';
import { ChipsInputComponent } from './shared/components/chips/chips-input.component';
import { TagsRecommendedComponent } from './modules/recommended/tags-recommended.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        PdfViewerModule,
        NgMasonryGridModule,
        TagInputModule
    ],
    declarations: [
        ImageUploadComponent,
        PreviewImageComponent,
        EbookUploadComponent,
        PdfViwerComponent,
        BooksRecommendedComponent,
        TagsRecommendedComponent,
        TagComponent,
        TagAutoCompleteComponent,
        ChipsInputComponent
    ],
    exports: [
        ImageUploadComponent,
        PreviewImageComponent,
        EbookUploadComponent,
        PdfViwerComponent,
        BooksRecommendedComponent,
        TagsRecommendedComponent,
        TagComponent,
        TagAutoCompleteComponent,
        ChipsInputComponent
    ]
})
export class SharedModule { }