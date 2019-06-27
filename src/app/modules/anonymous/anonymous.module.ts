import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AnonymousComponent } from './anonymous.component';
import { BooksRecommendedComponent } from '../recommended/books-recommended.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { SharedModule } from 'src/app/shared.module';
import { NgMasonryGridModule } from 'ng-masonry-grid';

const routes: Routes = [
  {
    path: 'anonymous',
    //path: '',
    component: AnonymousComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      // {
      //   path: 'recommended',
      //   component: RecommendedComponent
      // },
      {
        path: 'books/:id',
        component: BookDetailComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    BookDetailComponent,
  ],
  imports: [
    SharedModule,
    MaterialModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
  bootstrap: [AnonymousComponent]
})
export class AnonymousModule { }
