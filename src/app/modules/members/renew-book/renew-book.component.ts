import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MemberService } from 'src/app/core/services/members.service';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-renew-book',
  templateUrl: './renew-book.component.html',
  styleUrls: ['./renew-book.component.css']
})

export class RenewBookComponent implements OnInit {
  renewBookForm!: FormGroup;

  currentUser!: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  borrowedDate!: Date;
  dueDate!: Date;
  returnDate!: Date;
  rackId!: number;
  accountId!: number;
  bookItemId!: number;
  bookItemBarcode!: string;

  isLoadingResults = false;
  matcher = new ErrorStateMatcher();

  constructor(
    private router: Router, private api: MemberService,
    private formBuilder: FormBuilder, private alertService: AlertService,
    private authenticationService: AuthenticationService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.renewBookForm = this.formBuilder.group({
      'borrowedDate': null,
      'dueDate': null,
      'returnDate': null,
      'rackId': null,
      'accountId': this.currentUser.accountId,
      'bookItemId': null,
      'bookItemBarcode': null
    });

  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    console.log(form);
    this.api.renewBook(form)
      .subscribe(res => {
        this.alertService.showToastSuccess();
        this.router.navigate(['/recommended']);
      }, (err) => {
        this.alertService.showToastError();
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}