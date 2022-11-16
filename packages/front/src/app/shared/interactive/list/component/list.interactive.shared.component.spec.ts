import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInteractiveSharedComponent } from './list.interactive.shared.component';

describe('ListInteractiveSharedComponent', () => {
  let component: ListInteractiveSharedComponent;
  let fixture: ComponentFixture<ListInteractiveSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInteractiveSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInteractiveSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
