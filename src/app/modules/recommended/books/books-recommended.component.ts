import { OnInit, Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Book } from "src/app/shared/models/book";
import { SearchService } from "src/app/core/services/search.service";
import { User } from "src/app/shared/models/user";
import { Subscription } from "rxjs";
import { AuthenticationService } from "src/app/core/authentication/authentication.service";
import { AlertService } from "src/app/core/services/alert.service";
import { BookService } from "src/app/core/services/books.service";
import { NavigateExtension } from "src/app/core/extensions/navigate";


@Component({
  selector: 'app-books-recommended',
  templateUrl: './books-recommended.component.html',
  //styleUrls: ['./recommended.component.css']
  styleUrls: ['./ng-masonry-grid.css']
})

export class BooksRecommendedComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  public books: Book[];
  title: string = '';
  isLoadingResults = false;

  constructor(
    private router: Router,
    private navigateExtension: NavigateExtension,
    private bookService: BookService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.bookService.getBooksRecommended()
      .subscribe(res => {
        this.alertService.showToastSuccess();
        this.books = res;
        console.log(res);
      }, (err) => {
        this.alertService.showToastError();
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  onCardClickEvent(book: any) {
    if (this.currentUser == null) {
      //is anonymous
      this.navigateExtension.redirectTo(`/books/${book.id}`);
    } else if (this.currentUser.isMember) {
      this.navigateExtension.redirectTo(`/books/${book.id}`);
    } else if (this.currentUser.isLibrarian) {
      this.navigateExtension.redirectTo(`/librarians/findBook/${book.id}`);
    }
  }



}