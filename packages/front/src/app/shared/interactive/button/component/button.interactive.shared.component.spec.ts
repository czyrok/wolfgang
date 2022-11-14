import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonInteractiveShared } from './button.interactive.shared.component';

describe('ButtonInteractiveShared', () => {
  let component: ButtonInteractiveShared;
  let fixture: ComponentFixture<ButtonInteractiveShared>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonInteractiveShared ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonInteractiveShared);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
