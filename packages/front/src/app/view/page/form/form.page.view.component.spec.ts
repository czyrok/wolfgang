import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPageViewComponent } from './form.page.view.component';

describe('FormPageViewComponent', () => {
  let component: FormPageViewComponent;
  let fixture: ComponentFixture<FormPageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPageViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
