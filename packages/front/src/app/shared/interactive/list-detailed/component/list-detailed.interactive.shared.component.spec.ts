import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDetailedInteractiveSharedComponent } from './list-detailed.interactive.shared.component';

describe('ListDetailedInteractiveSharedComponent', () => {
  let component: ListDetailedInteractiveSharedComponent;
  let fixture: ComponentFixture<ListDetailedInteractiveSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDetailedInteractiveSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDetailedInteractiveSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
