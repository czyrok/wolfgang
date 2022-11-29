import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleAvatarPlayGamesMainViewComponent } from './circle.avatar.play.games.main.view.component';

describe('CircleAvatarPlayGamesMainViewComponent', () => {
  let component: CircleAvatarPlayGamesMainViewComponent;
  let fixture: ComponentFixture<CircleAvatarPlayGamesMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleAvatarPlayGamesMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleAvatarPlayGamesMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
