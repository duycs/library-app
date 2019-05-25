import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../authentication/authentication.service';
import { MemberService } from '../services/members.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  isExpanded = false;
  isAnonymous = false;
  isMember = false;
  isLibrarian = false;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private authenticationService: AuthenticationService,
    private memberService: MemberService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    console.log(this.currentUser);
    if (this.currentUser == null) {
      this.isAnonymous = true;
      //this.snackBar.open("You should register or login", "Thanks!", { duration: 2000, });
    } else {
      let accountTypes = this.currentUser.accountTypes;
      this.isMember = accountTypes.includes('member');
      this.isLibrarian = accountTypes.includes('librarian');
    }
    console.log(this.isMember);
    console.log(this.isLibrarian);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
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
      this.snackBar.open("Success", "", { duration: 2000, });
      this.router.navigate(['/']);
    });
  }

}
