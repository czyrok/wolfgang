import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameHomeMainViewComponent } from './username.home.main.view.component';

describe('UsernameHomeMainViewComponent', () => {
  let component: UsernameHomeMainViewComponent;
  let fixture: ComponentFixture<UsernameHomeMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsernameHomeMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsernameHomeMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
