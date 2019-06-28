import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { SearchService } from 'src/app/core/services/search.service';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { Book } from 'src/app/shared/models/book';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  searchForm: FormGroup;
  isShowRecommended = true;
  title: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      'key': ''
    });
  }

  onFormSubmit(form: any) {
    let value = form.key;
    this.router.navigate(['/search'], { queryParams: { key: value } });
  };

  //notify isSearching
  // isSearching(isSearching: any): void {
  //   console.log(isSearching);
  //   if (isSearching)
  //     this.isShowRecommended = false;
  //   else this.isShowRecommended = true;
  // }
}