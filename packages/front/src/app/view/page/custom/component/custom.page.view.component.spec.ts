import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPageViewComponent } from './custom.page.view.component';

describe('CustomPageViewComponent', () => {
  let component: CustomPageViewComponent;
  let fixture: ComponentFixture<CustomPageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomPageViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
