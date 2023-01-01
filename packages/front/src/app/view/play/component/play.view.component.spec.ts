import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayViewComponent } from './play.view.component';

describe('PlayViewComponent', () => {
  let component: PlayViewComponent;
  let fixture: ComponentFixture<PlayViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
