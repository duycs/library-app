import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/core/services/books.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-card-book-list',
  templateUrl: './card-book-list.component.html',
  styleUrls: ['./card-book-list.component.css']
})

export class CardBookListComponent implements OnInit {
  currentUser!: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  //@Input() page: number = 1;
  @Input() books!: Book[];

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private bookService: BookService,
    private alertService: AlertService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
    //this.getBooks(this.page);
  }

  // getBooks(page: number): void {
  //   this.bookService.getBooks()
  //     .subscribe(res => {
  //       this.alertService.showToastSuccess();
  //       this.books = res;
  //       console.log(res);
  //     }, (err) => {
  //       this.alertService.showToastError();
  //       console.log(err);
  //     });
  // }


  onCoverBookClickEvent(book: any) {
    let bookId = book.id;
    console.log(bookId);
    if (this.currentUser == null) {
      //is anonymous
      this.router.navigate(['/books/', bookId]);
    } else if (this.currentUser.isMember) {
      this.router.navigate(['/books/', bookId]);
    } else if (this.currentUser.isLibrarian) {
      this.router.navigate(['/librarians/findBook/', bookId]);
    }

  }

}