import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultReportManagingViewComponent } from './default.report.managing.view.component';

describe('DefaultReportManagingViewComponent', () => {
  let component: DefaultReportManagingViewComponent;
  let fixture: ComponentFixture<DefaultReportManagingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultReportManagingViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultReportManagingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
