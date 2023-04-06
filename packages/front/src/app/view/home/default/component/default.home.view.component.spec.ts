import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultHomeViewComponent } from './default.home.view.component';

describe('DefaultHomeViewComponent', () => {
  let component: DefaultHomeViewComponent;
  let fixture: ComponentFixture<DefaultHomeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultHomeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultHomeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
