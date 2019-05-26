import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookItemCreateComponent } from './bookItem-create.component';

describe('BookItemCreateComponent', () => {
  let component: BookItemCreateComponent;
  let fixture: ComponentFixture<BookItemCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookItemCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookItemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
