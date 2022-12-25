import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementAlertComponent } from './element.alert.component';

describe('ElementAlertComponent', () => {
  let component: ElementAlertComponent;
  let fixture: ComponentFixture<ElementAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
