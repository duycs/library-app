import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { BookListComponent } from './book-list/book-list.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { LibrariansComponent } from './librarians.component';
import { LibrariansActionComponent } from './librarians-action/librarians-action.component';

import { MaterialModule } from '../../material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  {
    path: 'librarians',
    component: LibrariansComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: 'actions',
        component: LibrariansActionComponent
      },
      {
        path: 'findBooks',
        component: BookListComponent
      },
      {
        path: 'findBook/:id',
        component: BookDetailComponent
      },
      {
        path: 'addBook',
        component: BookCreateComponent
      },
      {
        path: 'editBook/:id',
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
    BookEditComponent,
    LibrariansActionComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
  bootstrap: [LibrariansComponent]
})
export class LibrariansModule { }
