import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFrameworkMgmtComponent } from './admin-framework-mgmt.component';

describe('AdminFrameworkMgmtComponent', () => {
  let component: AdminFrameworkMgmtComponent;
  let fixture: ComponentFixture<AdminFrameworkMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFrameworkMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFrameworkMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
