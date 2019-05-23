import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiBookService } from '../../../core/services/books.service';
import { Book } from '../../../shared/models/book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

    book: Book = { id: 0, isbn : '', title: '', subject: '', publisher: '', language: '', pageNumber : null };
    isLoadingResults = true;
  
    constructor(private route: ActivatedRoute, private api: ApiBookService, private router: Router) { }
  
    ngOnInit() {
      console.log(this.route.snapshot.params['id']);
      this.getBookDetail(this.route.snapshot.params['id']);
    }
  
    getBookDetail(id) {
      this.api.getBook(id)
        .subscribe(data => {
          this.book = data;
          console.log(this.book);
          this.isLoadingResults = false;
        });
    }
  
    deleteBook(id) {
      this.isLoadingResults = true;
      this.api.deleteBook(id)
        .subscribe(res => {
            this.isLoadingResults = false;
            this.router.navigate(['/books']);
          }, (err) => {
            console.log(err);
            this.isLoadingResults = false;
          }
        );
    }
  
  }