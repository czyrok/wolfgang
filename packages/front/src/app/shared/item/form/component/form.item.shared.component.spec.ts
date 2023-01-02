import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemSharedComponent } from './form.item.shared.component';

describe('FormItemSharedComponent', () => {
  let component: FormItemSharedComponent;
  let fixture: ComponentFixture<FormItemSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormItemSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
