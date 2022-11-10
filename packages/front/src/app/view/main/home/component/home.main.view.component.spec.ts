import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMainViewComponent } from './home.main.view.component';

describe('HomeMainViewComponent', () => {
  let component: HomeMainViewComponent;
  let fixture: ComponentFixture<HomeMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
