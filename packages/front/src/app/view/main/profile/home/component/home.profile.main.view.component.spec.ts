import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProfileMainViewComponent } from './home.profile.main.view.component';

describe('HomeProfileMainViewComponent', () => {
  let component: HomeProfileMainViewComponent;
  let fixture: ComponentFixture<HomeProfileMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeProfileMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProfileMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
