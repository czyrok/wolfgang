import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesPlayViewComponent } from './rules.play.view.component';

describe('RulesPlayViewComponent', () => {
  let component: RulesPlayViewComponent;
  let fixture: ComponentFixture<RulesPlayViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulesPlayViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesPlayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
