import { Component, OnInit, Inject } from '@angular/core';
import { Book } from '../../../shared/models/book';
import { LibrarianService } from 'src/app/core/services/librarians.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
    displayedColumns: string[] = ['Title', 'Authors', 'Subject', 'EbookType', 'Publisher', 'Language',  'PageNumber'];
    data: Book[] = [];
    isLoadingResults = true;
  
    constructor(private api: LibrarianService) { }
  
    ngOnInit() {
      this.api.findBooks()
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