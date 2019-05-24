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
import { CounterComponent } from './shared/components/counter/counter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SearchComponent } from './search/search.component';
import { LibrariansComponent } from './modules/librarians/librarians.component';

import { LibrariansModule } from './modules/librarians/librarians.module';


const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'shared/components/counter', component: CounterComponent },
  { path: 'modules/librarians', component: LibrariansComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    SearchComponent,
    CounterComponent,
    LibrariansComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LibrariansModule,
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
