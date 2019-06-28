import { OnInit, Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/shared/models/user";
import { Subscription } from "rxjs";
import { AuthenticationService } from "src/app/core/authentication/authentication.service";
import { AlertService } from "src/app/core/services/alert.service";
import { TagService } from "src/app/core/services/tags.service";
import { Tag } from "src/app/shared/models/tag";
import { AuthorService } from "src/app/core/services/authors.service";
import { Chip } from "src/app/shared/models/chip";


@Component({
  selector: 'app-authors-recommended',
  templateUrl: './authors-recommended.component.html',
  styleUrls: ['./authors-recommended.component.css']
  //styleUrls: ['./ng-masonry-grid.css']
})

export class AuthorsRecommendedComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  public items: Chip[];
  title: string = '';
  isLoadingResults = false;

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
    this.authorService.getAuthors()
      .subscribe(res => {
        this.alertService.showToastSuccess();
        this.items = res;
        console.log(res);
      }, (err) => {
        this.alertService.showToastError();
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  onTagClickEvent(item: any) {
    console.log(item);
    this.router.navigate(['/search'], { queryParams: { key: item.name } });
  }

}