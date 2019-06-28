import { Book } from '../../../shared/models/book';
import { MemberService } from 'src/app/core/services/members.service';
import { OnInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { BookService } from 'src/app/core/services/books.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})

export class BookDetailComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  book: Book = {
    uid: 0, id: 0, isbn: 0, coverImage: '', ebook: '', ebookType: '',
    description: '', title: '', subjects: '', publisher: '', publicationDate: null,
    language: '', pageNumber: 0, authors: '', tags: ''
  };

  isLoadingResults = true;
  actionNameForBook: string = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private memberService: MemberService,
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
    console.log(this.route.snapshot.params['id']);
    this.getBookDetail(this.route.snapshot.params['id']);
  }

  getBookDetail(id) {
    this.bookService.getBook(id)
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

}