import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MemberService } from 'src/app/core/services/members.service';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { BookService } from 'src/app/core/services/books.service';

@Component({
  selector: 'app-checkout-book',
  templateUrl: './checkout-book.component.html',
  styleUrls: ['./checkout-book.component.css']
})

export class CheckoutBookComponent implements OnInit {
  checkoutBookForm!: FormGroup;

  currentUser!: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  borrowedDate!: Date;
  dueDate!: Date;
  returnDate!: Date;
  rackId!: number;
  totalBooksCheckedout!: number;
  accountId!: number;
  bookItemId!: number;
  bookItemBarcode!: string;

  bookId!: number;

  isLoadingResults = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private memberService: MemberService,
    private bookService : BookService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authenticationService: AuthenticationService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.bookId = params['bookId'];
    })

    this.checkoutBookForm = this.formBuilder.group({
      'borrowedDate': null,
      'dueDate': null,
      'returnDate': null,
      'totalBooksCheckedout': 0,
      'accountId': this.currentUser.accountId,
      'bookItemId': null,
      'bookItemBarcode': null
    });

    if (this.bookId > 0) {
      this.getBookItemByBookId(this.bookId);
    }
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    console.log(form);
    this.memberService.checkoutBook(form)
      .subscribe(res => {
        this.alertService.showToastSuccess();
        this.router.navigate(['/']);
      }, (err) => {
        this.alertService.showToastError();
        this.isLoadingResults = false;
      });
  }

  getBookItemByBookId(bookId: any) {
    this.bookService.getBookItemByBookId(bookId).subscribe(data => {
      if (data != null) {
        this.checkoutBookForm.controls['borrowedDate'].setValue(new Date());
        this.checkoutBookForm.controls['bookItemId'].setValue(data.id);
        this.checkoutBookForm.controls['bookItemBarcode'].setValue(data.barcode);
      } else {
        this.alertService.showToastMessage("Current don't have any book item");
      }
    });
  }

}