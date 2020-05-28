import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleConsultationComponent } from './article-consultation.component';

describe('ArticleConsultationComponent', () => {
  let component: ArticleConsultationComponent;
  let fixture: ComponentFixture<ArticleConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
