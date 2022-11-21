import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesPlayGamesMainViewComponent } from './rules.play.games.main.view.component';

describe('RulesPlayGamesMainViewComponent', () => {
  let component: RulesPlayGamesMainViewComponent;
  let fixture: ComponentFixture<RulesPlayGamesMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulesPlayGamesMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesPlayGamesMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
