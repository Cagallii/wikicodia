import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleModificationComponent } from './article-modification.component';

describe('ArticleModificationComponent', () => {
  let component: ArticleModificationComponent;
  let fixture: ComponentFixture<ArticleModificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleModificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
