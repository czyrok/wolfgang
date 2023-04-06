import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelLabelUserSharedComponent } from './level.label.user.shared.component';

describe('LevelLabelUserSharedComponent', () => {
  let component: LevelLabelUserSharedComponent;
  let fixture: ComponentFixture<LevelLabelUserSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelLabelUserSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelLabelUserSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
