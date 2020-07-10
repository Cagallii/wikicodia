import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLanguageMgmtComponent } from './admin-language-mgmt.component';

describe('AdminLanguageMgmtComponent', () => {
  let component: AdminLanguageMgmtComponent;
  let fixture: ComponentFixture<AdminLanguageMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLanguageMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLanguageMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
