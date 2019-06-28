import { NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { PreviewImageComponent } from './shared/components/image/preview-image.component';
import { ImageUploadComponent } from './shared/components/upload/image-upload.component';
import { EbookUploadComponent } from './shared/components/upload/ebook-upload.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfViwerComponent } from './shared/components/viewer/pdf-viewer.component';
import { FormsModule } from '@angular/forms';
import { BooksRecommendedComponent } from './modules/recommended/books/books-recommended.component';
import { NgMasonryGridModule } from 'ng-masonry-grid';
import { TagInputModule } from 'ngx-chips';
import { ChipsAutoCompleteComponent } from './shared/components/chips/chips-autocomplete.component';
import { ChipsInputComponent } from './shared/components/chips/chips-input.component';
import { TagsRecommendedComponent } from './modules/recommended/tags/tags-recommended.component';
import { SubjectsRecommendedComponent } from './modules/recommended/subjects/subjects-recommended.component';
import { AuthorsRecommendedComponent } from './modules/recommended/authors/authors-recommended.component';
import { BookListComponent } from './modules/books/book-list/book-list.component';


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
        SubjectsRecommendedComponent,
        AuthorsRecommendedComponent,
        BookListComponent,
        ChipsAutoCompleteComponent,
        ChipsInputComponent
    ],
    exports: [
        ImageUploadComponent,
        PreviewImageComponent,
        EbookUploadComponent,
        PdfViwerComponent,
        BooksRecommendedComponent,
        TagsRecommendedComponent,
        SubjectsRecommendedComponent,
        AuthorsRecommendedComponent,
        BookListComponent,
        ChipsAutoCompleteComponent,
        ChipsInputComponent
    ]
})
export class SharedModule { }