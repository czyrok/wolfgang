import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameBubbleUserSharedComponent } from './username.bubble.user.shared.component';

describe('UsernameBubbleUserSharedComponent', () => {
  let component: UsernameBubbleUserSharedComponent;
  let fixture: ComponentFixture<UsernameBubbleUserSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsernameBubbleUserSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsernameBubbleUserSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
