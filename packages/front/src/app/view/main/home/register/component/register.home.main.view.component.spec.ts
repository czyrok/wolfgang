import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterHomeMainViewComponent } from './register.home.main.view.component';

describe('RegisterHomeMainViewComponent', () => {
  let component: RegisterHomeMainViewComponent;
  let fixture: ComponentFixture<RegisterHomeMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterHomeMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterHomeMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
