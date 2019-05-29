import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiSearchService } from '../core/services/search.service';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Book } from '../shared/models/book';
import { AlertService } from '../core/services/alert.service';
import { User } from '../shared/models/user';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../core/authentication/authentication.service';

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
  title: string = '';
  isLoadingResults = false;
  regularDistribution = 100 / 3;

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
      // 'title': [null, Validators.required]
      'title': ''
    });
  }

  onFormSubmit(value: any) {
    this.isLoadingResults = true;
    this.api.searchBooksByTitle(value.title)
      .subscribe(res => {
        this.alertService.showToastSuccess();
        this.isLoadingResults = true;
        this.books = res;
        console.log(res);
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