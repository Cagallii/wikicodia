import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSuggestionHomeComponent } from './article-suggestion-home.component';

describe('ArticleSuggestionHomeComponent', () => {
  let component: ArticleSuggestionHomeComponent;
  let fixture: ComponentFixture<ArticleSuggestionHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleSuggestionHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSuggestionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
