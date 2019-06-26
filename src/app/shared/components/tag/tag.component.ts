import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  itemsAsObjects = [{ id: 0, value: 'Angular' }, { id: 1, value: 'React' }];

  // onKeydown(event) {
  //   if (event.key === "Enter") {
  //     this.notify.emit(this.itemsAsObjects);
  //   } else if (event.key === "Delete") {
  //     console.log(this.itemsAsObjects);
  //     this.notify.emit(this.itemsAsObjects);
  //   }
  // }
  public onTagEdited(item) {
    console.log('tag edited: current value is ' + item);
    this.notify.emit(this.itemsAsObjects);
  }

  public onTextChange(text) {
    console.log('text changed: value is ' + text);
}
}

