import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {MembersComponent } from './members.component';

import { MaterialModule } from '../../material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  {
    path: 'members',
    component: MembersComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  declarations: [
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
  bootstrap: [MembersComponent]
})
export class MembersModule { }
