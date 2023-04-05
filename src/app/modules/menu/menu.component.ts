import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../shared/models/user';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { MemberService } from '../../core/services/members.service';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlertService } from '../../core/services/alert.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit, OnDestroy {
  currentUser!: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  isExpanded = false;
  isAnonymous = false;
  isMember = false;
  isLibrarian = false;

  constructor(
    private alertService: AlertService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private memberService: MemberService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    if (this.currentUser == null) {
      this.isAnonymous = true;
      this.alertService.showToastMessage("You should register or login");
    }
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  logout() {
    let accountId = this.currentUser.accountId;
    this.authenticationService.logout(accountId).pipe(first()).subscribe(() => {
      console.log(accountId);
      this.alertService.showToastSuccess();
      this.router.navigate(['/']);
    });
  }
}

