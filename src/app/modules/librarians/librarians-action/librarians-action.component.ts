import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiImportBookService } from '../../../core/services/importBooks.service';
import { Book } from '../../../shared/models/book';

@Component({
  selector: 'app-librarians-action',
  templateUrl: './librarians-action.component.html',
  styleUrls: ['./librarians-action.component.css']
})
export class LibrariansActionComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: ApiImportBookService, private router: Router) { }

  ngOnInit() {
  }

  importBooks() {
    this.api.importBooks()
  }
}