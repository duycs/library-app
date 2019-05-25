import { OnInit, Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { Book } from "src/app/shared/models/book";
import { ApiSearchService } from "src/app/core/services/search.service";
import { ApiBookService } from "src/app/core/services/books.service";


@Component({
  selector: 'app-modules-anonymous-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})

export class RecommendedComponent implements OnInit {
  public books: Book[];
  searchForm: FormGroup;
  title: string = '';
  isLoadingResults = false;

  constructor(private router: Router, private apiBook: ApiBookService, private apiSearch: ApiSearchService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      'title': [null, Validators.required]
    });

    this.apiBook.getBooksRecommended()
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

  onFormSubmit(value: any) {
    this.isLoadingResults = true;
    this.apiSearch.searchBooksByTitle(value.title)
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