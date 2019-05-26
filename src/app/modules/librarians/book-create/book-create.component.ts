import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { LibrarianService } from 'src/app/core/services/librarians.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})

export class BookCreateComponent implements OnInit {
  bookForm: FormGroup;
  isbn: string = '';
  title: string = '';
  subject: string = '';
  publisher: string = '';
  language: string = '';
  pageNumber: string = '';
  isLoadingResults = false;

  constructor(private router: Router, private api: LibrarianService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      'isbn': [null, Validators.required],
      'title': [null, Validators.required],
      'subject': [null],
      'publisher': [null],
      'language': [null],
      'pageNumber': [null]
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    console.log(form);
    this.api.addBook(form)
      .subscribe(res => {
        this.snackBar.open("Success", "Ok", {
          duration: 2000,
        });
        // let id = res['id'];
        // this.isLoadingResults = false;
        // this.router.navigate(['/books/detail', id]);
        this.router.navigate(['/librarians/findBooks']);
      }, (err) => {
        this.snackBar.open("Error", "", {
          duration: 2000,
        });
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}