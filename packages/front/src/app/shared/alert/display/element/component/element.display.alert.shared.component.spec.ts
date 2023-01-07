import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementDisplayAlertSharedComponent } from './element.display.alert.shared.component';

describe('ElementDisplayAlertSharedComponent', () => {
  let component: ElementDisplayAlertSharedComponent;
  let fixture: ComponentFixture<ElementDisplayAlertSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementDisplayAlertSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementDisplayAlertSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
