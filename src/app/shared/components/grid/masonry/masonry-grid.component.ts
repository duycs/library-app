import { OnInit, Component, Input, Output, EventEmitter } from "@angular/core";
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
  selector: 'app-masonry-grid',
  templateUrl: './masonry-grid.component.html',
  //styleUrls: ['./recommended.component.css']
  styleUrls: ['./ng-masonry-grid.css']
})

export class MasonryGridComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  @Input() label: string = '';
  @Input() items: any[];
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

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
  
  }

  onCardClickEvent(item: any) {
    console.log(item);
    this.notify.emit(item);
  }
}