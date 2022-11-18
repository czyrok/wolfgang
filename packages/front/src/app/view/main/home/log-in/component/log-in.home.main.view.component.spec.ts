import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInHomeMainViewComponent } from './log-in.home.main.view.component';

describe('LogInHomeMainViewComponent', () => {
  let component: LogInHomeMainViewComponent;
  let fixture: ComponentFixture<LogInHomeMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogInHomeMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInHomeMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
