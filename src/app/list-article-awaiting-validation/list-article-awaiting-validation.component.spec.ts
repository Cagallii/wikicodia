import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArticleAwaitingValidationComponent } from './list-article-awaiting-validation.component';

describe('ListArticleAwaitingValidationComponent', () => {
  let component: ListArticleAwaitingValidationComponent;
  let fixture: ComponentFixture<ListArticleAwaitingValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListArticleAwaitingValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArticleAwaitingValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
