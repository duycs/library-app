import { Component, OnInit, Inject } from '@angular/core';
import { Book } from '../../../shared/models/book';
import { LibrarianService } from 'src/app/core/services/librarians.service';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  displayedColumns: string[] = ['Title', 'Authors', 'Subject', 'EbookType', 'Publisher', 'Language', 'PageNumber'];
  data: Book[] = [];
  isLoadingResults = true;

  searchValue:string='';

  page: number = 1;
  size: number = 12;

  isCanBack = true;
  isCanNext = true;

  constructor(
    private librarianService: LibrarianService,
    private searchService: SearchService) { }

  ngOnInit() {
    this.getBooks(this.page);
  }

  getBooks(page: number) {
    console.log(page);
    this.librarianService.findBooks(page, this.size)
      .subscribe(res => {
        console.log(this.data);

        // if (total > this.size)
        //   this.isCanNext = true;

        this.data = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  //actions
  nextPage() {
    this.page++;
    this.getBooks(this.page);
  }

  backPage() {
    this.page--;
    this.getBooks(this.page);
  }

  //emit search from child
  emitSearchValueChange(value: any) {
    console.log(value);
    this.searchService.searchBooksByTag(value, this.page, this.size).subscribe(res => {
      console.log(this.data);

      this.data = res;
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
}