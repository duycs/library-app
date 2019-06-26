import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ApiSearchService } from 'src/app/core/services/search.service';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { Book } from 'src/app/shared/models/book';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  public books: Book[];
  searchForm: FormGroup;
  key: string = '';
  isLoadingResults = false;
  isLoadedResult = false;
  regularDistribution = 100 / 3;

  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router,
    private api: ApiSearchService,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      // 'key': [null, Validators.required]
      'key': ''
    });
  }

  onFormSubmit(value: any) {
    this.api.searchBooksByAll(value.key)
      .subscribe(res => {
        this.alertService.showToastSuccess();
        this.books = res;
        console.log(res);
        this.isLoadingResults = true;
        this.isLoadedResult = true;
        this.notify.emit(this.isLoadedResult);
      }, (err) => {
        this.alertService.showToastError();
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  onCardClickEvent(book) {
    if (this.currentUser == null) {
      //is anonymous
      this.router.navigate(['/anonymous/books/', book.id]);
    } else if (this.currentUser.isMember) {
      this.router.navigate(['/anonymous/books/', book.id]);
    } else if (this.currentUser.isLibrarian) {
      this.router.navigate(['/librarians/findBook/', book.id]);
    }

  }

}