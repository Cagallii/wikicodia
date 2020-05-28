import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArticleCreatedComponent } from './list-article-created.component';

describe('ListArticleCreatedComponent', () => {
  let component: ListArticleCreatedComponent;
  let fixture: ComponentFixture<ListArticleCreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListArticleCreatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArticleCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
