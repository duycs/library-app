import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiBookService } from '../../../core/services/books.service';
import { Book } from '../../../shared/models/book';
import { FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { LibrarianService } from 'src/app/core/services/librarians.service';

@Component({
  selector: 'app-bookItem-edit',
  templateUrl: './bookItem-edit.component.html',
  styleUrls: ['./bookItem-edit.component.css']
})
export class BookItemEditComponent implements OnInit {
  bookItemForm: FormGroup;

  id: number;
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

  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: LibrarianService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getBookItem(this.route.snapshot.params['id']);
    this.bookItemForm = this.formBuilder.group({
      'id': null,
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
  }

  getBookItem(id) {
    this.api.findBookItem(id).subscribe(data => {
      console.log(data);
      this.id = data.id;
      this.bookItemForm.setValue({
        id: data.id,
        bookId: data.bookId,
        barcode: data.barcode,
        isReferenceOnly: data.isReferenceOnly,
        borrowedDate: data.borrowedDate,
        dueDate: data.dueDate,
        price: data.price,
        formatId: data.formatId,
        bookStatusId: data.bookStatusId,
        purchaseDate: data.purchaseDate,
        rackId: data.rackId,
        libraryId: data.libraryId
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateBookItem(form)
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
        this.snackBar.open("Error", "Ok", { duration: 2000, });
      });
  }

  bookItemDetails() {
    this.router.navigate(['/librarians/findBookItem', this.id]);
  }

}