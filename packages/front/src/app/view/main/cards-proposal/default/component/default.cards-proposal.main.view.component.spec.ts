import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultCardsProposalMainViewComponent } from './default.cards-proposal.main.view.component';

describe('DefaultCardsProposalMainViewComponent', () => {
  let component: DefaultCardsProposalMainViewComponent;
  let fixture: ComponentFixture<DefaultCardsProposalMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultCardsProposalMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultCardsProposalMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
