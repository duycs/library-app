import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, NgForm, FormControl, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LibrarianService } from 'src/app/core/services/librarians.service';
import { MemberService } from 'src/app/core/services/members.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-bookItem-create',
  templateUrl: './bookItem-create.component.html',
  styleUrls: ['./bookItem-create.component.css']
})

export class BookItemCreateComponent implements OnInit {
  bookItemForm!: FormGroup;
  matcher = new ErrorStateMatcher();
  bookId!: number;
  barcode!: string;
  isReferenceOnly!: boolean;
  borrowedDate!: Date;
  dueDate!: Date;
  price!: number;
  formatId!: number;
  bookStatusId!: number;
  purchaseDate!: Date;
  rackId!: number;
  libraryId!: number;

  // formatChoosed: string;
  // referenceChoosed: string;
  // statusChoosed: string;
  // formatOptions: string[] = ['Hard cover', 'Paper back', 'Audio book', 'Ebook', 'Newspaper', 'Magazine', 'Journal'];
  // referenceOptions: string[] = ['Can borrow', 'Reference Only'];
  // bookStatusOptions: string[] = ['AVAILABLE', 'RESERVED', 'LOANED', 'LOST'];

  isLoadingResults = false;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private router: Router,
    private librarianService: LibrarianService,
    private formBuilder: FormBuilder,
    private alertService: AlertService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.bookId = params['bookId'];
    })
    this.bookItemForm = this.formBuilder.group({
      'bookId': [null, Validators.required],
      'barcode': [null, Validators.required],
      'isReferenceOnly': false,
      'borrowedDate': null,
      'dueDate': null,
      'price': null,
      'formatId': 1,
      'bookStatusId': 1,
      'purchaseDate': null,
      'rackId': 1,
      'libraryId': 1,
    });

    if (this.bookId > 0) {
      this.bookItemForm.controls['bookId'].setValue(this.bookId);
    }
  }



  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    console.log(form);
    this.librarianService.addBookItem(form)
      .subscribe(res => {
        this.alertService.showToastSuccess();
        this.router.navigate(['/librarians/findBookItems']);
      }, (err) => {
        this.alertService.showToastError();
        console.log(err);
        this.isLoadingResults = false;
      });
  }
  onReferenceChanged(event: any) {
    console.log(event.target.value);
    this.isReferenceOnly = event.target.value;
  }

  onBookFormatChanged(event: any) {
    console.log(event.target.value);
  }
  onBookStatusChanged(event: any) {
    console.log(event.target.value);
  }
}
