import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherUserModalReportSharedComponent } from './other.user.modal.report.shared.component';

describe('OtherUserModalReportSharedComponent', () => {
  let component: OtherUserModalReportSharedComponent;
  let fixture: ComponentFixture<OtherUserModalReportSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherUserModalReportSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherUserModalReportSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
