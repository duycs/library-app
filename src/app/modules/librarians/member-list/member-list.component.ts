import { Component, OnInit, Inject } from '@angular/core';
import { Book } from '../../../shared/models/book';
import { LibrarianService } from 'src/app/core/services/librarians.service';
import { Person } from 'src/app/shared/models/person';
import { Member } from 'src/app/shared/models/member';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  accountId: number;
  dateOfMembership: Date;
  totalBooksCheckedout: number;
  person: Person;
  id: number;
  displayedColumns: string[] = ['id', 'name', 'email', 'dateOfMembership', 'totalBooksCheckedout'];
  data: Member[] = [];
  isLoadingResults = true;

  constructor(private api: LibrarianService) { }

  ngOnInit() {
    this.api.findMembers()
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
}