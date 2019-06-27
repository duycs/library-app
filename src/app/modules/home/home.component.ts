import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ApiSearchService } from 'src/app/core/services/search.service';
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
  isShowRecommended = false;
  title: string = '';

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
    this.isShowRecommended = true;
  }

  // isLoadedResult(isLoadedResult: any): void {
  //   console.log(isLoadedResult);
  //   if (isLoadedResult)
  //     this.isShowRecommended = false;
  //   else this.isShowRecommended = true;
  // }
}