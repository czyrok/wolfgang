import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerModalSharedComponent } from './container.modal.shared.component';

describe('ContainerModalSharedComponent', () => {
  let component: ContainerModalSharedComponent;
  let fixture: ComponentFixture<ContainerModalSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerModalSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerModalSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
