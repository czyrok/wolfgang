import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarSharedComponent } from './avatar.shared.component';

describe('AvatarSharedComponent', () => {
  let component: AvatarSharedComponent;
  let fixture: ComponentFixture<AvatarSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
