import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookItemEditComponent } from './bookItem-edit.component';

describe('BookItemEditComponent', () => {
  let component: BookItemEditComponent;
  let fixture: ComponentFixture<BookItemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookItemEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
