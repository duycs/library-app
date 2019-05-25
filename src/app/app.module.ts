import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

//material, include animation,
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './core/nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import {LoginComponent } from './login/login.component';
import { CounterComponent } from './shared/components/counter/counter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SearchComponent } from './search/search.component';
import { LibrariansComponent } from './modules/librarians/librarians.component';

import { LibrariansModule } from './modules/librarians/librarians.module';
import { AnonymousModule } from './modules/anonymous/anonymous.module';
import { AnonymousComponent } from './modules/anonymous/anonymous.component';
import { MembersModule } from './modules/members/members.module';
import { MembersComponent } from './modules/members/members.component';



const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'login', component: LoginComponent },
  //{ path: 'shared/components/counter', component: CounterComponent },
  { path: 'modules/librarians', component: LibrariansComponent },
  { path: 'modules/anonymous', component: AnonymousComponent },
  { path: 'modules/members', component: MembersComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    SearchComponent,
    CounterComponent,
    LibrariansComponent,
    AnonymousComponent,
    MembersComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LibrariansModule,
    MembersModule,
    AnonymousModule,
    RouterModule.forRoot(appRoutes),
    RouterModule.forChild([

    ]),
    BrowserAnimationsModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
