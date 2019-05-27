import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {MembersComponent } from './members.component';

import { MaterialModule } from '../../material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MemberRegisterComponent } from './register/register.component';
import { CheckoutBookComponent } from './checkout-book/checkout-book.component';
import { ReturnBookComponent } from './return-book/return-book.component';
import { RenewBookComponent } from './renew-book/renew-book.component';
import { ReserveBookComponent } from './reserve-book/reserve-book.component';

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
      {
        path: 'register',
        component: MemberRegisterComponent
      },
      {
        path: 'checkout',
        component: CheckoutBookComponent
      },
      {
        path: 'return',
        component: ReturnBookComponent
      },
      {
        path: 'renew',
        component: RenewBookComponent
      },
      {
        path: 'reserve',
        component: ReserveBookComponent
      },
    ]
  }
];

@NgModule({
  declarations: [
    MemberRegisterComponent,
    CheckoutBookComponent,
    ReturnBookComponent,
    RenewBookComponent,
    ReserveBookComponent,
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
