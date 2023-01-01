import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInHomeViewComponent } from './log-in.home.view.component';

describe('LogInHomeViewComponent', () => {
  let component: LogInHomeViewComponent;
  let fixture: ComponentFixture<LogInHomeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogInHomeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInHomeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
