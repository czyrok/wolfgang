import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCardsProposalMainViewComponent } from './view.cards-proposal.main.view.component';

describe('ViewCardsProposalMainViewComponent', () => {
  let component: ViewCardsProposalMainViewComponent;
  let fixture: ComponentFixture<ViewCardsProposalMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCardsProposalMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCardsProposalMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
