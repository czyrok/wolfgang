import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTabListInteractiveSharedComponent } from './item.tab.list.interactive.shared.component';

describe('ItemTabListInteractiveSharedComponent', () => {
  let component: ItemTabListInteractiveSharedComponent;
  let fixture: ComponentFixture<ItemTabListInteractiveSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTabListInteractiveSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTabListInteractiveSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
