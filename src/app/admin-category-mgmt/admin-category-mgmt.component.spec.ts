import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryMgmtComponent } from './admin-category-mgmt.component';

describe('AdminCategoryMgmtComponent', () => {
  let component: AdminCategoryMgmtComponent;
  let fixture: ComponentFixture<AdminCategoryMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCategoryMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoryMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
