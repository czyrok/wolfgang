import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerDisplayAlertComponent } from './container.display.alert.shared.component';

describe('ContainerDisplayAlertComponent', () => {
  let component: ContainerDisplayAlertComponent;
  let fixture: ComponentFixture<ContainerDisplayAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerDisplayAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerDisplayAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
