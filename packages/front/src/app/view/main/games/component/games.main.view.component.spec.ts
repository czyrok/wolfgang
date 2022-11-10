import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesMainViewComponent } from './games.main.view.component';

describe('GamesMainViewComponent', () => {
  let component: GamesMainViewComponent;
  let fixture: ComponentFixture<GamesMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
