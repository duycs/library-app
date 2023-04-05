import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

//material, include animation,
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './core/nav-menu/nav-menu.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { LibrariansModule } from './modules/librarians/librarians.module';
import { MembersModule } from './modules/members/members.module';
import { LibrariansComponent } from './modules/librarians/librarians.component';
import { SharedModule } from './shared.module';
import { MembersComponent } from './modules/members/members.component';
import { SearchComponent } from './modules/search/search.component';
import { AboutComponent } from './modules/about/about.component';
import { MenuComponent } from './modules/menu/menu.component';
// import { NgMasonryGridModule } from 'ng-masonry-grid';
import { TagInputModule } from 'ngx-chips';
import { BooksModule } from './modules/books/books.module';
import { BooksComponent } from './modules/books/books.component';
import { AuthorsModule } from './modules/authors/authors.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { TagsModule } from './modules/tags/tags.module';
import { AuthorsComponent } from './modules/authors/authors.component';
import { SubjectsComponent } from './modules/subjects/subjects.component';
import { TagsComponent } from './modules/tags/tags.component';
import { HeaderComponent } from './core/header/header.component';



const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'search', component: SearchComponent },
  { path: 'login', component: LoginComponent },

  { path: 'modules/books', component: BooksComponent },
  { path: 'modules/librarians', component: LibrariansComponent },
  { path: 'modules/members', component: MembersComponent },
  { path: 'modules/authors', component: AuthorsComponent },
  { path: 'modules/subjects', component: SubjectsComponent },
  { path: 'modules/tags', component: TagsComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    SearchComponent,
    MenuComponent,
    BooksComponent,
    LibrariansComponent,
    MembersComponent,
    AuthorsComponent,
    SubjectsComponent,
    TagsComponent,
  ],
  imports: [
    TagInputModule,
    SharedModule,
    //NgMasonryGridModule,
    BrowserAnimationsModule,
    MaterialModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
    RouterModule.forChild([]),
    BrowserAnimationsModule,
    NoopAnimationsModule,

    //app modules
    BooksModule,
    LibrariansModule,
    MembersModule,
    AuthorsModule,
    SubjectsModule,
    TagsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
