import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared.module';
import { TagsComponent } from './tags.component';
import { TagListComponent } from './tag-list/tag-list.component';

const routes: Routes = [
  {
    path: 'tags',
    component: TagsComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
        component: TagListComponent
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
    TagListComponent,
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
  bootstrap: [TagsComponent]
})
export class TagsModule { }
