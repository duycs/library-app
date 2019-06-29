import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared.module';
import { AuthorsComponent } from './authors.component';
import { AuthorListComponent } from './author-list/author-list.component';

const routes: Routes = [
  {
    path: 'authors',
    component: AuthorsComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
        component: AuthorListComponent
      },
      // {
      //   path: ':id',
      //   component: BookDetailComponent
      // },
    ]
  }
];

@NgModule({
  declarations: [
    AuthorListComponent,
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
  bootstrap: [AuthorsComponent]
})
export class AuthorsModule { }
