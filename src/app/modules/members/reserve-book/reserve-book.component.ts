import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MemberService } from 'src/app/core/services/members.service';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-reserve-book',
  templateUrl: './reserve-book.component.html',
  styleUrls: ['./reserve-book.component.css']
})

export class ReserveBookComponent implements OnInit {
  returnForm: FormGroup;

  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  accountId: number;
  bookItemId: number;
  bookItemBarcode: string;

  isLoadingResults = false;

  constructor(
    private router: Router, private api: MemberService,
    private formBuilder: FormBuilder, private alertService: AlertService,
    private authenticationService: AuthenticationService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.returnForm = this.formBuilder.group({
      'accountId': this.currentUser.accountId,
      'bookItemId': null,
      'bookItemBarcode': null,
    });

  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    console.log(form);
    this.api.reserveBook(form)
      .subscribe(res => {
        this.alertService.showToastSuccess();
        this.router.navigate(['/anonymous/recommended']);
      }, (err) => {
        this.alertService.showToastError();
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}