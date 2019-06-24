import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiBookService } from '../../../core/services/books.service';
import { Book } from '../../../shared/models/book';
import { LibrarianService } from 'src/app/core/services/librarians.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book: Book = {
    uid: 0, id: 0, isbn: 0, coverImage: '', ebook: '',
    ebookType: '', description: '', title: '', subject: '', author: '',
    publisher: '', publicationDate: new Date(), language: '', pageNumber: 0
  };
  isLoadingResults = true;
  pdfSrc : string ;

  constructor(private route: ActivatedRoute, private api: ApiBookService, private librarianService: LibrarianService,
    private router: Router) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    this.getBookDetail(this.route.snapshot.params['id']);
    this.book.constructor();
  }

  getBookDetail(id) {
    this.api.getBook(id)
      .subscribe(data => {
        this.book = data;
        console.log(this.book);
        this.isLoadingResults = false;
        this.pdfSrc = this.book.ebook;
      });
  }

  deleteBook(id) {
    this.isLoadingResults = true;
    this.api.deleteBook(id)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/librarians/findBooks']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }
}