import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGamesMainViewComponent } from './home.games.main.view.component';

describe('HomeGamesMainViewComponent', () => {
  let component: HomeGamesMainViewComponent;
  let fixture: ComponentFixture<HomeGamesMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeGamesMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGamesMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
