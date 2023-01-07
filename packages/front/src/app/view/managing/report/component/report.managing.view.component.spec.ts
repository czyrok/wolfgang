import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportManagingViewComponent } from './report.managing.view.component';

describe('ReportManagingViewComponent', () => {
  let component: ReportManagingViewComponent;
  let fixture: ComponentFixture<ReportManagingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportManagingViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportManagingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
