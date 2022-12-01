import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardsProposalMainViewComponent } from './add.cards-proposal.main.view.component';

describe('AddCardsProposalMainViewComponent', () => {
  let component: AddCardsProposalMainViewComponent;
  let fixture: ComponentFixture<AddCardsProposalMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCardsProposalMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCardsProposalMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
