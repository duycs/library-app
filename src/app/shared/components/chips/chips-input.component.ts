import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Item {
  id: number;
  name: string;
}

/**
 * @title Chips with input
 */
@Component({
  selector: 'app-chips-input',
  templateUrl: './chips-input.component.html',
  styleUrls: ['./chips-input.component.scss'],
})
export class ChipsInputComponent implements OnInit {
  @Input() label:string;
  @Input() items: Item[];
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  ngOnInit(): void {
    // this.label = '';
    // this.items = [];
  }

  // items: Item[] = [
  //   {id:0, name: 'Lemon'},
  //   {id:1, name: 'Lime'},
  //   {id:2, name: 'Apple'},
  // ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.items.push({id: 0, name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.notify.emit(this.items);

  }

  remove(item: Item): void {
    const index = this.items.indexOf(item);

    if (index >= 0) {
      this.items.splice(index, 1);
    }
    this.notify.emit(this.items);
  }
}
