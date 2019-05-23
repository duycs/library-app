import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { BookListComponent } from './book-list/book-list.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BooksComponent } from './books.component';

import { MaterialModule } from '../../material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  {
    path: 'books',
    component: BooksComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: '',
        component: BookListComponent
      },
      {
        path: 'create',
        component: BookCreateComponent
      },
      {
        path: 'detail/:id',
        component: BookDetailComponent
      },
      {
        path: 'edit/:id',
        component: BookEditComponent
      },
    ]
  }
];

@NgModule({
  declarations: [
    BookListComponent,
    BookCreateComponent,
    BookDetailComponent,
    BookEditComponent],
  imports: [
    MaterialModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
  bootstrap: [BooksComponent]
})
export class BooksModule { }
