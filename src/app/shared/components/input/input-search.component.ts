import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { Book } from 'src/app/shared/models/book';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { SearchService } from 'src/app/core/services/search.service';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})

export class InputSearchComponent implements OnInit {

  searchForm!: FormGroup;
  matcher = new ErrorStateMatcher();
  //public type:string;

  @Input() value: string = '';
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService) {

  }

  //init
  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      'key': '',
    });
  }

  //submit
  onFormSubmit(form: any) {
    let value = form.key;
    console.log(value);
    this.notify.emit(value);
  }

}