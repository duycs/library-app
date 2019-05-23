import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiSearchService } from '../core/services/search.service';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Book } from '../shared/models/book';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  public books: Book[];
  searchForm: FormGroup;
  title: string = '';
  isLoadingResults = false;

  constructor(private router: Router, private api: ApiSearchService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      'title': [null, Validators.required]
    });
  }

  onFormSubmit(value: any) {
    this.isLoadingResults = true;
    this.api.searchBooksByTitle(value.title)
      .subscribe(res => {
        this.snackBar.open("Success", "Ok", {
          duration: 2000,
        });
        this.books = res;
        console.log(res);
      }, (err) => {
        this.snackBar.open("Error", "", {
          duration: 2000,
        });
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}