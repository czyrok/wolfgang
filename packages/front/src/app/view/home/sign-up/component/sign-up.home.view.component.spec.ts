import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpHomeViewComponent } from './sign-up.home.view.component';

describe('SignUpHomeViewComponent', () => {
  let component: SignUpHomeViewComponent;
  let fixture: ComponentFixture<SignUpHomeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpHomeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpHomeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
