import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibrarianService } from 'src/app/core/services/librarians.service';
import { BookItem } from 'src/app/shared/models/book-item';

@Component({
  selector: 'app-bookItem-detail',
  templateUrl: './bookItem-detail.component.html',
  styleUrls: ['./bookItem-detail.component.css']
})
export class BookItemDetailComponent implements OnInit {
  bookItem!: BookItem;
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: LibrarianService, private router: Router) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    this.getBookItemDetail(this.route.snapshot.params['id']);
  }

  getBookItemDetail(id: any) {
    this.api.findBookItem(id)
      .subscribe(data => {
        this.bookItem = data;
        console.log(this.bookItem);
        this.isLoadingResults = false;
      });
  }

  deleteBookItem(id: any) {
    this.isLoadingResults = true;
    this.api.removeBookItem(id)
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