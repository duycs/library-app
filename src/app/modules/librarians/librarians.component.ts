import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-librarians',
  templateUrl: './librarians.component.html',
  styleUrls: ['./librarians.component.css']
})
export class LibrariansComponent implements OnInit {
  isLoadingResults = false;
  constructor() { }

  ngOnInit() {
    this.isLoadingResults=true;
  }

}
