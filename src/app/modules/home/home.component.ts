import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { SearchService } from 'src/app/core/services/search.service';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { Book } from 'src/app/shared/models/book';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { AuthorService } from 'src/app/core/services/authors.service';
import { SubjectService } from 'src/app/core/services/subjects.service';
import { TagService } from 'src/app/core/services/tags.service';
import { BookService } from 'src/app/core/services/books.service';
import { NavigateExtension } from 'src/app/core/extensions/navigate';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  currentUser!: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  //searchForm: FormGroup;
  isShowRecommended = true;

  //input for child
  public labelAuthors: string = 'Authors';
  public labelSubjects: string = 'Subjects';
  public labelTags: string = 'Tags';
  public labelBooks: string = 'Books';

  public bookItems!: any[];
  public authorItems!: any[];
  public subjectItems!: any[];
  public tagItems!: any[];

  pageChips: number =1;
  sizeChips: number = 9;

  pageBooks: number = 1;
  sizeBooks: number = 19;
  searchValue = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private navigateExtension: NavigateExtension,
    private alertService: AlertService,
    private bookService: BookService,
    private subjectService: SubjectService,
    private authorService: AuthorService,
    private tagService: TagService,
    private authenticationService: AuthenticationService,
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    //fetch data
    this.getAuthors();
    this.getSubjects();
    this.getTags();
    this.getBooks();
  }

  //fetch data
  getAuthors(): void {
    this.authorService.getAuthors(this.pageChips, this.sizeChips)
      .subscribe(res => {
        this.authorItems = res;
        console.log(res);
      }, (err) => {
        this.alertService.showToastError();
        console.log(err);
      });
  }

  getSubjects(): void {
    this.subjectService.getSubjects(this.pageChips, this.sizeChips)
      .subscribe(res => {
        this.subjectItems = res;
        console.log(res);
      }, (err) => {
        this.alertService.showToastError();
        console.log(err);
      });
  }

  getTags(): void {
    this.tagService.getTags(this.pageChips, this.sizeChips)
      .subscribe(res => {
        this.tagItems = res;
        console.log(res);
      }, (err) => {
        this.alertService.showToastError();
        console.log(err);
      });
  }

  getBooks(): void {
    this.bookService.getBooks(this.pageBooks, this.sizeBooks)
      .subscribe(res => {
        this.alertService.showToastSuccess();
        this.bookItems = res;
        console.log(res);
      }, (err) => {
        this.alertService.showToastError();
        console.log(err);
      });
  }

  //emit value search submit change
  emitSearchValueChange(value: any){
    this.router.navigate(['/search'], { queryParams: { key: value } });
  }

  //emit event from child
  setClickAuthorItem(item: any) {
    this.router.navigate(['/search'], { queryParams: { key: item.name, type: 'author' } });
  }

  setClickSubjectItem(item: any) {
    this.router.navigate(['/search'], { queryParams: { key: item.name, type: 'subject' } });
  }

  setClickTagItem(item: any) {
    this.router.navigate(['/search'], { queryParams: { key: item.name, type: 'tag' } });
  }

  // emit event from child
  setClickBookItem(item: any): void {
    let bookId = item.id;

    if (this.currentUser == null) {
      //is anonymous
      this.navigateExtension.redirectTo(`/books/${bookId}`);
    } else if (this.currentUser.isMember) {
      this.navigateExtension.redirectTo(`/books/${bookId}`);
    } else if (this.currentUser.isLibrarian) {
      this.navigateExtension.redirectTo(`/librarians/findBook/${bookId}`);
    }
  }
  
}