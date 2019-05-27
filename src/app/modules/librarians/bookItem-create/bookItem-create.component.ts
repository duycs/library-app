import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, NgForm, FormControl, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { LibrarianService } from 'src/app/core/services/librarians.service';
import { MemberService } from 'src/app/core/services/members.service';

@Component({
  selector: 'app-bookItem-create',
  templateUrl: './bookItem-create.component.html',
  styleUrls: ['./bookItem-create.component.css']
})

export class BookItemCreateComponent implements OnInit {
  bookItemForm: FormGroup;

  bookId: number;
  barcode: string;
  isReferenceOnly: boolean;
  borrowedDate: Date;
  dueDate: Date;
  price: number;
  formatId: number;
  bookStatusId: number;
  purchaseDate: Date;
  rackId: number;
  libraryId: number;

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
    private snackBar: MatSnackBar) { }

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
        this.snackBar.open("Success", "Ok", {
          duration: 2000,
        });
        this.router.navigate(['/librarians/findBookItems']);
      }, (err) => {
        this.snackBar.open("Error", "", {
          duration: 2000,
        });
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
