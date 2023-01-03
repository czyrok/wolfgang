import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReportManagingViewComponent } from './view.report.managing.view.component';

describe('ViewReportManagingViewComponent', () => {
  let component: ViewReportManagingViewComponent;
  let fixture: ComponentFixture<ViewReportManagingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewReportManagingViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReportManagingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
