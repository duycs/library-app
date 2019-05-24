import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrariansActionComponent } from './librarians-action.component';

describe('LibrariansActionComponent', () => {
  let component: LibrariansActionComponent;
  let fixture: ComponentFixture<LibrariansActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrariansActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrariansActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
