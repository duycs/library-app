import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AnonymousComponent } from './anonymous.component';
import { RecommendedComponent } from './recommended/recommended.component';

const routes: Routes = [
  {
    path: 'anonymous',
    component: AnonymousComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: 'recommended',
        component: RecommendedComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    RecommendedComponent,
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
  bootstrap: [AnonymousComponent]
})
export class AnonymousModule { }
