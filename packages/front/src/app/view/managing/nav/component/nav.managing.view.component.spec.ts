import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavManagingViewComponent } from './nav.managing.view.component';

describe('NavManagingViewComponent', () => {
  let component: NavManagingViewComponent;
  let fixture: ComponentFixture<NavManagingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavManagingViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavManagingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
