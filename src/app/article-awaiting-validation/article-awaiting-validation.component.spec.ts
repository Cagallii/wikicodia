import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleAwaitingValidationComponent } from './article-awaiting-validation.component';

describe('ArticleAwaitingValidationComponent', () => {
  let component: ArticleAwaitingValidationComponent;
  let fixture: ComponentFixture<ArticleAwaitingValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleAwaitingValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleAwaitingValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
