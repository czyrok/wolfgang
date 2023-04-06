import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadAvatarUserSharedComponent } from './head.avatar.user.shared.component';

describe('HeadAvatarUserSharedComponent', () => {
  let component: HeadAvatarUserSharedComponent;
  let fixture: ComponentFixture<HeadAvatarUserSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadAvatarUserSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadAvatarUserSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
