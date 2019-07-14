import { OnInit, Component } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/shared/models/user";
import { Subscription } from "rxjs";
import { AuthenticationService } from "src/app/core/authentication/authentication.service";
import { AlertService } from "src/app/core/services/alert.service";
import { AuthorService } from "src/app/core/services/authors.service";


@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})

export class AuthorListComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  public labelAuthors: string = 'Authors';
  public authorItems : any[];

  page:number = 1;
  size:number = 100;

  constructor(
    private router: Router,
    private authorService: AuthorService, 
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
   this.getAuthors();
  }

  getAuthors(): void {
    this.authorService.getAuthors(this.page, this.size)
      .subscribe(res => {
        this.authorItems = res;
        console.log(res);
      }, (err) => {
        this.alertService.showToastError();
        console.log(err);
      });
  }

  setClickAuthorItem(item: any) {
    console.log(item);
    this.router.navigate(['/search'], { queryParams: { key: item.name } });
  }

}