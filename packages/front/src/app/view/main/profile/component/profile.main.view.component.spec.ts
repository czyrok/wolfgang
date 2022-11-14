import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMainViewComponent } from './profile.main.view.component';

describe('ProfileMainViewComponent', () => {
  let component: ProfileMainViewComponent;
  let fixture: ComponentFixture<ProfileMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
