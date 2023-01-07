import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultHomeMainViewComponent } from './default.home.main.view.component';

describe('DefaultHomeMainViewComponent', () => {
  let component: DefaultHomeMainViewComponent;
  let fixture: ComponentFixture<DefaultHomeMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultHomeMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultHomeMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
