import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibrarianService } from 'src/app/core/services/librarians.service';
import { Member } from 'src/app/shared/models/member';
import { BlockMember } from 'src/app/shared/models/block-member';
import { MatSnackBar } from '@angular/material';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  email: string;
  member: Member = { id: null, accountId: null, dateOfMembership: null, totalBooksCheckedout: null, person: null, accountStatus: null, libraryCardId: null };
  isLoadingResults = true;
  actionToMember: string;


  constructor(private route: ActivatedRoute, private api: LibrarianService, 
    private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.actionToMember = "Block";
    this.email = this.route.snapshot.params['email'];
    this.getMemberDetail(this.email);
  }

  getMemberDetail(email) {
    this.api.findMember(email)
      .subscribe(data => {
        this.member = data;
        console.log(this.member);
        this.isLoadingResults = false;
      });
  }

  unBlockOrBlockToMember() {
    if ("Unblock" == this.actionToMember) {
      this.unblockMember();
    }
    else {
      this.blockMember();
    }
  }

  blockMember() {
    let blockMember: BlockMember = { email: this.email };
    this.api.blockMember(blockMember)
      .subscribe(data => {
        this.isLoadingResults = false;
        this.alertService.showToastSuccess();
        this.actionToMember = "Unblock";
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
        this.alertService.showToastError();
      });
  }

  unblockMember() {
    let blockMember: BlockMember = { email: this.email };
    this.api.unblockMember(blockMember)
      .subscribe(data => {
        this.isLoadingResults = false;
        this.alertService.showToastSuccess();
        this.actionToMember = "Block";
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
        this.alertService.showToastError();
      });
  }

}