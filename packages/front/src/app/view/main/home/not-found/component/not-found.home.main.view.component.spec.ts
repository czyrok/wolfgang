import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundHomeMainViewComponent } from './not-found.home.main.view.component';

describe('NotFoundHomeMainViewComponent', () => {
  let component: NotFoundHomeMainViewComponent;
  let fixture: ComponentFixture<NotFoundHomeMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFoundHomeMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundHomeMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
