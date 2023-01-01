import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointLabelUserSharedComponent } from './point.label.user.shared.component';

describe('PointLabelUserSharedComponent', () => {
  let component: PointLabelUserSharedComponent;
  let fixture: ComponentFixture<PointLabelUserSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointLabelUserSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointLabelUserSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
