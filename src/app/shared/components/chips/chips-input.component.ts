import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Chip } from '../../models/chip';

/**
 * @title Chips with input
 */
@Component({
  selector: 'app-chips-input',
  templateUrl: './chips-input.component.html',
  styleUrls: ['./chips-input.component.scss'],
})
export class ChipsInputComponent implements OnInit {
  @Input() label!: string;
  @Input() items!: Chip[];
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.items.push({ id: 0, name: value.trim(), count: 0, description: '' });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.notify.emit(this.items);

  }

  remove(item: Chip): void {
    const index = this.items.indexOf(item);
    console.log(index);
    if (index >= 0) {
      this.items.splice(index, 1);
    }
    this.notify.emit(this.items);
  }
}
