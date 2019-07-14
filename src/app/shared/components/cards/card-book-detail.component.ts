import { Book } from '../../models/book';
import { MemberService } from 'src/app/core/services/members.service';
import { OnInit, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { BookService } from 'src/app/core/services/books.service';
import { ReactService } from 'src/app/core/services/reacts.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-card-book-detail',
  templateUrl: './card-book-detail.component.html',
  styleUrls: ['./card-book-detail.component.css']
})

export class CardBookDetailComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  @Input() bookId: number;

  book: Book = {
    uid: 0, id: 0, isbn: 0, coverImage: '', ebook: '', ebookType: '',
    description: '', title: '', subjects: '', publisher: '', publicationDate: null,
    language: '', pageNumber: 0, authors: '', tags: '', reactCount: 0
  };

  isLoadingResults = true;
  isLoadingLove = false;
  actionNameForBook: string = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private memberService: MemberService,
    private reactService: ReactService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    if (this.currentUser) {
      if (this.currentUser.isMember) {
        console.log("LENDING BOOK");
        this.actionNameForBook = "LENDING BOOK";
      } else if (this.currentUser.isLibrarian) {
        console.log("EDIT BOOK");
        this.actionNameForBook = "EDIT BOOK";
      } else {
        console.log("LOGIN TO LENDING BOOK");
        this.actionNameForBook = "LOGIN TO LENDING BOOK";
      }
    } else {
      console.log("LOGIN TO LENDING BOOK");
      this.actionNameForBook = "LOGIN TO LENDING BOOK";
    }
    this.getBookDetail(this.bookId);
  }

  getBookDetail(bookId: number) {
    this.bookService.getBook(bookId)
      .subscribe(data => {
        this.book = data;
        console.log(this.book);
        this.isLoadingResults = false;
      });
  }

  actionMethodForBook() {
    if (this.currentUser) {
      if (this.currentUser.isMember) {
        this.router.navigate(['/members/checkout'], { queryParams: { bookId: this.book.id } });
      } else if (this.currentUser.isLibrarian) {
        this.router.navigate(['/librarian/editBook'], { queryParams: { bookId: this.book.id } });
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  reactBook() {
    this.isLoadingLove = true;

    let react = {
      bookId: this.bookId,
      accountId: this.currentUser.accountId,
      reactType: "love"
    };

    this.reactService.addOrRemoveReactToBook(react).subscribe(data => {
      let result = data;
      this.isLoadingLove = false;
      if (result == 1) {
        this.book.reactCount = this.book.reactCount + 1;
        this.alertService.showToastMessage("You unlove this book");
      } else if (result == 0) {
        this.book.reactCount = this.book.reactCount - 1;
        this.alertService.showToastMessage("You love this book");
      }
    });
  }

}