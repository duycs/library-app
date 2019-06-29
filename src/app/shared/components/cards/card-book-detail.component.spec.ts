import { CardBookDetailComponent } from './card-book-detail.component';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';

describe('BookDetailComponent', () => {
  let component: CardBookDetailComponent;
  let fixture: ComponentFixture<CardBookDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardBookDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
