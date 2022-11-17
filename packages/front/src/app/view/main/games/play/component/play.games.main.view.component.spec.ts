import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayGamesMainViewComponent } from './play.games.main.view.component';

describe('PlayGamesMainViewComponent', () => {
  let component: PlayGamesMainViewComponent;
  let fixture: ComponentFixture<PlayGamesMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayGamesMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayGamesMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
