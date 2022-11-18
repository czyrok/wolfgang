import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextBarInteractiveSharedComponent } from './text-bar.interactive.shared.component';

describe('TextBarInteractiveSharedComponent', () => {
  let component: TextBarInteractiveSharedComponent;
  let fixture: ComponentFixture<TextBarInteractiveSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextBarInteractiveSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextBarInteractiveSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
