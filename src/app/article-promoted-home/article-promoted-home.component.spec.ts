import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePromotedHomeComponent } from './article-promoted-home.component';

describe('ArticlePromotedHomeComponent', () => {
  let component: ArticlePromotedHomeComponent;
  let fixture: ComponentFixture<ArticlePromotedHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlePromotedHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePromotedHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
