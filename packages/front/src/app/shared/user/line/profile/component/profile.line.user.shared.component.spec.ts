import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLineUserSharedComponent } from './profile.line.user.shared.component';

describe('ProfileLineUserSharedComponent', () => {
  let component: ProfileLineUserSharedComponent;
  let fixture: ComponentFixture<ProfileLineUserSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileLineUserSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLineUserSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
