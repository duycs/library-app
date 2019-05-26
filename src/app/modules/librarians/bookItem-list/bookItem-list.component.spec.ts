import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookItemListComponent } from './bookItem-list.component';

describe('BookItemListComponent', () => {
  let component: BookItemListComponent;
  let fixture: ComponentFixture<BookItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
