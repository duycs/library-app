import { Book } from '../../../shared/models/book';
import { MemberService } from 'src/app/core/services/members.service';
import { OnInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { BookService } from 'src/app/core/services/books.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { NavigateExtension } from 'src/app/core/extensions/navigate';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})

export class BookDetailComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  //value for childs
  //for book detail
  public bookId: number;

  //for masonry books
  public labelBooks:string='You may be interested in';
  public bookItems: any[];
  public pageBooks: number = 1;
  public sizeBooks: number = 19;

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private navigateExtension: NavigateExtension,
    private bookService: BookService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    //bookId for book detail child
    let bookId = this.route.snapshot.params['id'];
    this.bookId = bookId;

    //get and set for masonry books child
    this.getBooks();
  }

  //show grid masonry books for anonymous and members
  getBooks(): void {
    this.bookService.getBooks(this.pageBooks, this.sizeBooks)
      .subscribe(res => {
        this.alertService.showToastSuccess();
        this.bookItems = res;
        console.log(res);
      }, (err) => {
        this.alertService.showToastError();
        console.log(err);
      });
  }

   // emit event from child
   setClickBookItem(item: any): void {
    let bookId = item.id;

    if (this.currentUser == null) {
      //is anonymous
      this.navigateExtension.redirectTo(`/books/${bookId}`);
    } else if (this.currentUser.isMember) {
      this.navigateExtension.redirectTo(`/books/${bookId}`);
    } else if (this.currentUser.isLibrarian) {
      this.navigateExtension.redirectTo(`/librarians/findBook/${bookId}`);
    }
  }


}