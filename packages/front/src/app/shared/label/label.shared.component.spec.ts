import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelShared } from './label.shared.component';

describe('LabelShared', () => {
  let component: LabelShared;
  let fixture: ComponentFixture<LabelShared>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelShared ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelShared);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
