import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollPageViewComponent } from './scroll.page.view.component';

describe('ScrollPageViewComponent', () => {
  let component: ScrollPageViewComponent;
  let fixture: ComponentFixture<ScrollPageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollPageViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollPageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
