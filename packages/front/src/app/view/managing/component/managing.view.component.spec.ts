import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagingViewComponent } from './managing.view.component';

describe('ManagingViewComponent', () => {
  let component: ManagingViewComponent;
  let fixture: ComponentFixture<ManagingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagingViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
