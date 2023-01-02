import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameHomeViewComponent } from './username.home.view.component';

describe('UsernameHomeViewComponent', () => {
  let component: UsernameHomeViewComponent;
  let fixture: ComponentFixture<UsernameHomeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsernameHomeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsernameHomeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
