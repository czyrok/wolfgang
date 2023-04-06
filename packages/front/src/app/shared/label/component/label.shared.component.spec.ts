import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelSharedComponent } from './label.shared.component';

describe('LabelSharedComponent', () => {
  let component: LabelSharedComponent;
  let fixture: ComponentFixture<LabelSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
