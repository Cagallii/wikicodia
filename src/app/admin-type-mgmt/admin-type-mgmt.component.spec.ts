import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTypeMgmtComponent } from './admin-type-mgmt.component';

describe('AdminTypeMgmtComponent', () => {
  let component: AdminTypeMgmtComponent;
  let fixture: ComponentFixture<AdminTypeMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTypeMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTypeMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
