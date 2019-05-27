import { OnInit, Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { Book } from "src/app/shared/models/book";
import { ApiSearchService } from "src/app/core/services/search.service";
import { ApiBookService } from "src/app/core/services/books.service";
import { User } from "src/app/shared/models/user";
import { Subscription } from "rxjs";
import { AuthenticationService } from "src/app/core/authentication/authentication.service";


@Component({
  selector: 'app-modules-anonymous-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})

export class RecommendedComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  
  public books: Book[];
  searchForm: FormGroup;
  title: string = '';
  isLoadingResults = false;

  constructor(
    private router: Router, private apiBook: ApiBookService, 
    private apiSearch: ApiSearchService, private formBuilder: FormBuilder, 
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
      });
     }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      'title': [null, Validators.required]
    });

    this.apiBook.getBooksRecommended()
      .subscribe(res => {
        this.snackBar.open("Success", "Ok", {
          duration: 2000,
        });
        this.books = res;
        console.log(res);
      }, (err) => {
        this.snackBar.open("Error", "", {
          duration: 2000,
        });
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  onFormSubmit(value: any) {
    this.isLoadingResults = true;
    this.apiSearch.searchBooksByTitle(value.title)
      .subscribe(res => {
        this.snackBar.open("Success", "Ok", {
          duration: 2000,
        });
        this.books = res;
        console.log(res);
      }, (err) => {
        this.snackBar.open("Error", "", {
          duration: 2000,
        });
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  onCardClickEvent(book){
    if(this.currentUser.isMember){
      this.router.navigate(['/anonymous/books/', book.id]);
    }else if(this.currentUser.isLibrarian){
      this.router.navigate(['/librarians/findBook/', book.id]);
    }   else {
      //is anonymous
      this.router.navigate(['/anonymous/books/', book.id]);
    }
  }

}