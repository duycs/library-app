import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { Book } from 'src/app/shared/models/book';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  public booksByTitle: Book[];
  public booksByAuthor: Book[];
  public booksBySubject: Book[];
  public booksByTag: Book[];

  searchForm: FormGroup;
  value: string;
  isSearching = false;

  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serchService: SearchService,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  //init
  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      'key': ''
    });

    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.value = params['key'];
    })

    console.log(this.value);
    if (this.value) {
      this.searchForm.setValue({
        key: this.value
      });

      this.searching(this.value);
    }
  }

  //submit
  onFormSubmit(form: any) {
    let value = form.key;
    this.searching(value);
  }

  //searching
  private searching(value: string) {
    this.isSearching = true;
    this.notify.emit(this.isSearching);

    this.serchService.searchBooksByTitle(value)
      .subscribe(res => {
        this.booksByTitle = res;
        console.log(res);
      }, (err) => {
        this.alertService.showToastError();
        console.log(err);
      });

    this.serchService.searchBooksByAuthor(value)
      .subscribe(res => {
        this.booksByAuthor = res;
        console.log(res);
      }, (err) => {
        this.alertService.showToastError();
        console.log(err);
      });

    this.serchService.searchBooksBySubject(value)
      .subscribe(res => {
        this.booksBySubject = res;
        console.log(res);
      }, (err) => {
        this.alertService.showToastError();
        console.log(err);
      });

    this.serchService.searchBooksByTag(value)
      .subscribe(res => {
        this.booksByTag = res;
        console.log(res);
      }, (err) => {
        this.alertService.showToastError();
        console.log(err);
      });
  }

  //click item in list
  onCardClickEvent(book) {
    if (this.currentUser == null) {
      //is anonymous
      this.router.navigate(['/books/', book.id]);
    } else if (this.currentUser.isMember) {
      this.router.navigate(['/books/', book.id]);
    } else if (this.currentUser.isLibrarian) {
      this.router.navigate(['/librarians/findBook/', book.id]);
    }

  }

}