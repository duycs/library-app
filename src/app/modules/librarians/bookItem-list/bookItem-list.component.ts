import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LibrarianService } from 'src/app/core/services/librarians.service';
import { BookItem } from 'src/app/shared/models/book-item';

@Component({
  selector: 'app-bookItem-list',
  templateUrl: './bookItem-list.component.html',
  styleUrls: ['./bookItem-list.component.css']
})
export class BookItemListComponent implements OnInit {
  displayedColumns: string[] = ['Barcode', 'IsReferenceOnly', 'Price', 'Status', 'Rack'];
  data: BookItem[] = [];
  isLoadingResults = true;

  constructor(private api: LibrarianService) { }

  ngOnInit() {
    this.api.findBookItems()
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