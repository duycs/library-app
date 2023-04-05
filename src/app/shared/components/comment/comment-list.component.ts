import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { CommentService } from 'src/app/core/services/comments.service';
import { Comment } from '../../models/comment.model';

@Component({
    selector: 'app-comment-list',
    templateUrl: './comment-list.component.html',
    styleUrls: ['./comment-list.component.css']
})

export class CommentListComponent implements OnInit {
    constructor(
        private router: Router,
        private commentService: CommentService,
        private alertService: AlertService) {
    }

    @Input() comments!: Comment[];
    @Output() deleteComment = new EventEmitter<boolean>();

    ngOnInit(): void {
    }

    deleteClicked() {
        this.deleteComment.emit(true);
    }

}
