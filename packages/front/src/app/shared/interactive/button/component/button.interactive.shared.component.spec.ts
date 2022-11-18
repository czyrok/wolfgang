import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonInteractiveSharedComponent } from './button.interactive.shared.component';

describe('ButtonInteractiveSharedComponent', () => {
  let component: ButtonInteractiveSharedComponent;
  let fixture: ComponentFixture<ButtonInteractiveSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonInteractiveSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonInteractiveSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
