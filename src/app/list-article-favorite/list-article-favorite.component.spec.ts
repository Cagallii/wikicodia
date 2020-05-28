import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArticleFavoriteComponent } from './list-article-favorite.component';

describe('ListArticleFavoriteComponent', () => {
  let component: ListArticleFavoriteComponent;
  let fixture: ComponentFixture<ListArticleFavoriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListArticleFavoriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArticleFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
