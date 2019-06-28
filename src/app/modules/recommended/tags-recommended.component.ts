import { OnInit, Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/shared/models/user";
import { Subscription } from "rxjs";
import { AuthenticationService } from "src/app/core/authentication/authentication.service";
import { AlertService } from "src/app/core/services/alert.service";
import { TagService } from "src/app/core/services/tags.service";
import { Tag } from "src/app/shared/models/tag";


@Component({
  selector: 'app-tags-recommended',
  templateUrl: './tags-recommended.component.html',
  styleUrls: ['./tags-recommended.component.css']
  //styleUrls: ['./ng-masonry-grid.css']
})

export class TagsRecommendedComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  public tags: Tag[];
  title: string = '';
  isLoadingResults = false;

  constructor(
    private router: Router,
    private tagService: TagService, private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.tagService.getTags()
      .subscribe(res => {
        this.alertService.showToastSuccess();
        this.tags = res;
        console.log(res);
      }, (err) => {
        this.alertService.showToastError();
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  onTagClickEvent(item) {
    console.log(item);
    this.router.navigate(['/search/books/byTagName?key=', item.name]);
  }

}