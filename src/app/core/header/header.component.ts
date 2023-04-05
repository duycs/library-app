
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from 'src/app/shared/models/user';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    currentUser!: User;
    currentUserSubscription!: Subscription;
    name!: string;
    isAuthenticated!: boolean;
    isAdmin!: boolean;
    userId!: string;
    staffId!: number | null;

    @Output() public sidenavToggle = new EventEmitter();

    constructor(
        //public cronJobSignalRService: CronJobSignalrService,
        private alertService: AlertService,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
          });

        //this.cronJobSignalRService.startConnection();
        //this.cronJobSignalRService.addJobListener();
    }

    login() {
        //this.authenticationService.login();
    }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.currentUserSubscription.unsubscribe();
    }

    async signout() {
        //await this.authenticationService.signout();
    }

    public onToggleSidenav = () => {
        this.sidenavToggle.emit();
    }
}