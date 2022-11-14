import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpMainViewComponent } from './help.main.view.component';

describe('HelpMainViewComponent', () => {
  let component: HelpMainViewComponent;
  let fixture: ComponentFixture<HelpMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
