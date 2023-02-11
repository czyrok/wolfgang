import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReportSharedComponent } from './modal.report.shared.component';

describe('ModalReportSharedComponent', () => {
  let component: ModalReportSharedComponent;
  let fixture: ComponentFixture<ModalReportSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalReportSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalReportSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
