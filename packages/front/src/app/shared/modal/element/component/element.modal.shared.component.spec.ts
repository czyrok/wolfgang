import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementModalSharedComponent } from './element.modal.shared.component';

describe('ElementModalSharedComponent', () => {
  let component: ElementModalSharedComponent;
  let fixture: ComponentFixture<ElementModalSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementModalSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementModalSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
