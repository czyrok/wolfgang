import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMainViewComponent } from './nav.main.view.component';

describe('NavMainViewComponent', () => {
  let component: NavMainViewComponent;
  let fixture: ComponentFixture<NavMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
