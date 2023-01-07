import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultGamesMainViewComponent } from './default.games.main.view.component';

describe('DefaultGamesMainViewComponent', () => {
  let component: DefaultGamesMainViewComponent;
  let fixture: ComponentFixture<DefaultGamesMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultGamesMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultGamesMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
