import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleStopPromoComponent } from './article-stop-promo.component';

describe('ArticleStopPromoComponent', () => {
  let component: ArticleStopPromoComponent;
  let fixture: ComponentFixture<ArticleStopPromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleStopPromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleStopPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
