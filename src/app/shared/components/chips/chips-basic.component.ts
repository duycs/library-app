import { OnInit, Component, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/shared/models/user";
import { Subscription } from "rxjs";
import { AuthenticationService } from "src/app/core/authentication/authentication.service";
import { AlertService } from "src/app/core/services/alert.service";
import { TagService } from "src/app/core/services/tags.service";
import { Tag } from "src/app/shared/models/tag";
import { Chip } from "src/app/shared/models/chip";


@Component({
  selector: 'app-chips-basic',
  templateUrl: './chips-basic.component.html',
  styleUrls: ['./chips-basic.component.css']
})

export class ChipsBasicComponent implements OnInit {
  currentUser!: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  @Input() type: string = '';
  @Input() label: string ='';
  @Input() items!: Chip[];
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  @Output() notifyMore: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    
  }

  //emit event
  onItemClickEvent(item: any) {
    console.log(item);
    this.notify.emit(item);
  }

  // onMoreClickEvent(){
  //   this.notifyMore.emit(this.type);
  // }

}