import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsProposalMainViewComponent } from './cards-proposal.main.view.component';

describe('CardsProposalMainViewComponent', () => {
  let component: CardsProposalMainViewComponent;
  let fixture: ComponentFixture<CardsProposalMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsProposalMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsProposalMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
