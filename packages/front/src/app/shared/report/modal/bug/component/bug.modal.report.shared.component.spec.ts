import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugModalReportSharedComponent } from './bug.modal.report.shared.component';

describe('BugModalReportSharedComponent', () => {
  let component: BugModalReportSharedComponent;
  let fixture: ComponentFixture<BugModalReportSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugModalReportSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugModalReportSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
