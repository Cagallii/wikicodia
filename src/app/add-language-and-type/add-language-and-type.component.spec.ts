import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLanguageAndTypeComponent } from './add-language-and-type.component';

describe('AddLanguageAndTypeComponent', () => {
  let component: AddLanguageAndTypeComponent;
  let fixture: ComponentFixture<AddLanguageAndTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLanguageAndTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLanguageAndTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
