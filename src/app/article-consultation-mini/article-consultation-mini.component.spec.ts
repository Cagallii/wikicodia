import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleConsultationMiniComponent } from './article-consultation-mini.component';

describe('ArticleConsultationMiniComponent', () => {
  let component: ArticleConsultationMiniComponent;
  let fixture: ComponentFixture<ArticleConsultationMiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleConsultationMiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleConsultationMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
