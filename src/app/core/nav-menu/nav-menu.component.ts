import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../authentication/authentication.service';
import { MemberService } from '../services/members.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, OnDestroy {
  currentUser!: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  isExpanded = false;
  isAnonymous = false;
  isMember = false;
  isLibrarian = false;
  isShowProgressBar = false;
  isAuthenticated = false;

  @Output() sidenavClose = new EventEmitter();

  constructor(
    private alertService: AlertService,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    console.log(this.currentUser);
    if (this.currentUser == null) {
      this.isAnonymous = true;
      //this.alertService.open("You should register or login", "Thanks!", { duration: 2000, });
    } else {
      // let accountTypes = this.currentUser.accountTypes;
      // this.isMember = accountTypes.includes('member');
      // this.isLibrarian = accountTypes.includes('librarian');
    }
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    let accountId = this.currentUser.accountId;
    this.authenticationService.logout(accountId).pipe(first()).subscribe(() => {
      console.log(accountId);
      this.alertService.showToastSuccess();
      this.router.navigate(['/']);
    });
  }

  login() {
    //this.authenticationService.login();
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

}
