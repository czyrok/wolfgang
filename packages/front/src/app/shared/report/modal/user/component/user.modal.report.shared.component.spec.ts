import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserModalReportSharedComponent } from './user.modal.report.shared.component';

describe('UserModalReportSharedComponent', () => {
  let component: UserModalReportSharedComponent;
  let fixture: ComponentFixture<UserModalReportSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserModalReportSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserModalReportSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
