import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorRoleManagementComponent } from './administrator-role-management.component';

describe('AdministratorRoleManagementComponent', () => {
  let component: AdministratorRoleManagementComponent;
  let fixture: ComponentFixture<AdministratorRoleManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorRoleManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorRoleManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
