import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { Book } from 'src/app/shared/models/book';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})

export class BookListComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  @Input() books: Book[];

  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit():void {
  }

  onCardClickEvent(book: any) {
    if (this.currentUser == null) {
      //is anonymous
      this.router.navigate(['/books/', book.id]);
    } else if (this.currentUser.isMember) {
      this.router.navigate(['/books/', book.id]);
    } else if (this.currentUser.isLibrarian) {
      this.router.navigate(['/librarians/findBook/', book.id]);
    }

  }

}