import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { Book } from 'src/app/shared/models/book';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { SearchService } from 'src/app/core/services/search.service';
import { CommentService } from 'src/app/core/services/comments.service';

@Component({
  selector: 'app-input-comment',
  templateUrl: './input-comment.component.html',
  styleUrls: ['./input-comment.component.css']
})

export class InputCommentComponent implements OnInit {

  commentForm: FormGroup;
  //public type:string;

  value: string;
  @Input() parentId: number;
  @Input() bookId: number;
  @Input() currentUser: any;

  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private commentService: CommentService) {
  }

  //init
  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      'key': '',
    });
  }

  //submit
  onFormSubmit(form: any) {
    let value = form.key;

    if(!value || this.value == ''){
      this.alertService.showToastMessage("Comment can't empty");
      return;
    }

    let comment = {
      content: value,
      parentId: this.parentId || null,
      bookId: this.bookId,
      creatorId: this.currentUser.accountId,
      creatorName: this.currentUser.userName,
      //TODO:
      creatorAvatar: "",
      creationDate: new Date()
    };


    this.commentService.addComment(comment)
      .subscribe(res => {
        console.log("added comment", comment);
        this.alertService.showToastSuccess();
        this.notify.emit(comment);
        this.value = '';
      }, (err) => {
        this.alertService.showToastError();
      });
  }

}