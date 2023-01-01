import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineItemSharedComponent } from './line.item.shared.component';

describe('LineItemSharedComponent', () => {
  let component: LineItemSharedComponent;
  let fixture: ComponentFixture<LineItemSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineItemSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineItemSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
