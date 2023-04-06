import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleAvatarPlayViewComponent } from './circle.avatar.play.view.component';

describe('CircleAvatarPlayViewComponent', () => {
  let component: CircleAvatarPlayViewComponent;
  let fixture: ComponentFixture<CircleAvatarPlayViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleAvatarPlayViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleAvatarPlayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
