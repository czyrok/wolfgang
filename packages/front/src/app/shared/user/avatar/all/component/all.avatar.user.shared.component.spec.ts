import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAvatarUserSharedComponent } from './all.avatar.user.shared.component';

describe('AllAvatarUserSharedComponent', () => {
  let component: AllAvatarUserSharedComponent;
  let fixture: ComponentFixture<AllAvatarUserSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAvatarUserSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAvatarUserSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
