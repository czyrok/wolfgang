import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleItemSharedComponent } from './bubble.item.shared.component';

describe('BubbleItemSharedComponent', () => {
  let component: BubbleItemSharedComponent;
  let fixture: ComponentFixture<BubbleItemSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BubbleItemSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleItemSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
