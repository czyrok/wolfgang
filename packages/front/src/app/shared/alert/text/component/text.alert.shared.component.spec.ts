import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAlertSharedComponent } from './text.alert.shared.component';

describe('TextAlertSharedComponent', () => {
  let component: TextAlertSharedComponent;
  let fixture: ComponentFixture<TextAlertSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextAlertSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAlertSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
