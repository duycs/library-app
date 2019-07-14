import { NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { PreviewImageComponent } from './shared/components/image/preview-image.component';
import { ImageUploadComponent } from './shared/components/upload/image-upload.component';
import { EbookUploadComponent } from './shared/components/upload/ebook-upload.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfViwerComponent } from './shared/components/viewer/pdf-viewer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMasonryGridModule } from 'ng-masonry-grid';
import { TagInputModule } from 'ngx-chips';
import { ChipsAutoCompleteComponent } from './shared/components/chips/chips-autocomplete.component';
import { ChipsInputComponent } from './shared/components/chips/chips-input.component';
import { MasonryGridComponent } from './shared/components/grid/masonry/masonry-grid.component';
import { ChipsBasicComponent } from './shared/components/chips/chips-basic.component';
import { CardBookListComponent } from './shared/components/list/card-book-list.component';
import { CardBookDetailComponent } from './shared/components/cards/card-book-detail.component';
import { RouterModule } from '@angular/router';
import { InputSearchComponent } from './shared/components/input/input-search.component';
import { CommentListComponent } from './shared/components/comment/comment-list.component';
import { InputCommentComponent } from './shared/components/input/input-comment.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        PdfViewerModule,
        NgMasonryGridModule,
        TagInputModule,
        RouterModule,
    RouterModule.forChild([

    ]),
    ],
    declarations: [
        ImageUploadComponent,
        PreviewImageComponent,
        EbookUploadComponent,
        PdfViwerComponent,
        InputSearchComponent,
        ChipsAutoCompleteComponent,
        ChipsInputComponent,
        ChipsBasicComponent,
        MasonryGridComponent,
        CardBookListComponent,
        CardBookDetailComponent,
        InputCommentComponent,
        CommentListComponent,
    ],
    exports: [
        ImageUploadComponent,
        PreviewImageComponent,
        EbookUploadComponent,
        PdfViwerComponent,
        InputSearchComponent,
        ChipsAutoCompleteComponent,
        ChipsInputComponent,
        ChipsBasicComponent,
        MasonryGridComponent,
        CardBookListComponent,
        CardBookDetailComponent,
        InputCommentComponent,
        CommentListComponent,
    ]
})
export class SharedModule { }