import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedListInteractiveSharedComponent } from './detailed.list.interactive.shared.component';

describe('DetailedListInteractiveSharedComponent', () => {
  let component: DetailedListInteractiveSharedComponent;
  let fixture: ComponentFixture<DetailedListInteractiveSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedListInteractiveSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedListInteractiveSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
