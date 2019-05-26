import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookItemDetailComponent } from './bookItem-detail.component';

describe('BookItemDetailComponent', () => {
  let component: BookItemDetailComponent;
  let fixture: ComponentFixture<BookItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
