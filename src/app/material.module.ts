import { NgModule, ViewChild } from '@angular/core';

import {
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatGridListModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDividerModule,
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatPaginatorModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        MatGridListModule,
        FlexLayoutModule,
        MatRadioModule,
        MatCheckboxModule,
        MatSelectModule,
        MatDividerModule
    ],
    exports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatPaginatorModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        MatGridListModule,
        FlexLayoutModule,
        MatRadioModule,
        MatCheckboxModule,
        MatSelectModule,
        MatDividerModule
    ]
})
export class MaterialModule { }