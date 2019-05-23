import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiBookService } from '../../../core/services/books.service';
import { Book } from '../../../shared/models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
    displayedColumns: string[] = ['ISBN', 'Title', 'Subject', 'Publisher', 'Language',  'PageNumber'];
    data: Book[] = [];
    isLoadingResults = true;
  
    constructor(private api: ApiBookService) { }
  
    ngOnInit() {
      this.api.getBooks()
        .subscribe(res => {
          this.data = res;
          console.log(this.data);
          this.isLoadingResults = false;
        }, err => {
          console.log(err);
          this.isLoadingResults = false;
        });
    }
  }