import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorThemeComponent } from './selector-theme.component';

describe('SelectorThemeComponent', () => {
  let component: SelectorThemeComponent;
  let fixture: ComponentFixture<SelectorThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
