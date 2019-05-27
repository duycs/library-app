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
import { LibrarianRegisterComponent } from './register/register.component';
import { BookItemListComponent } from './bookItem-list/bookItem-list.component';
import { BookItemCreateComponent } from './bookItem-create/bookItem-create.component';
import { BookItemDetailComponent } from './bookItem-detail/bookItem-detail.component';
import { BookItemEditComponent } from './bookItem-edit/bookItem-edit.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';

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
        path: 'register',
        component: LibrarianRegisterComponent
      },
      {
        path: 'actions',
        component: LibrariansActionComponent
      },
      // route books
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

      // route bookItems
      {
        path: 'findBookItems',
        component: BookItemListComponent
      },
      {
        path: 'findBookItem/:id',
        component: BookItemDetailComponent
      },
      {
        path: 'addBookItem',
        component: BookItemCreateComponent
      },
      {
        path: 'editBookItem/:id',
        component: BookItemEditComponent
      },
      // rote members
      {
        path: 'findMembers',
        component: MemberListComponent
      },
      {
        path: 'findMember/:email',
        component: MemberDetailComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    BookListComponent,
    BookCreateComponent,
    BookDetailComponent,
    BookEditComponent,
    LibrarianRegisterComponent,
    LibrariansActionComponent,
    BookItemListComponent,
    BookItemCreateComponent,
    BookItemDetailComponent,
    BookItemEditComponent,
    MemberListComponent,
    MemberDetailComponent
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
