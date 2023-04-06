import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSubTabTabDetailedListInteractiveSharedComponent } from './item.sub-tab.tab.detailed.list.interactive.shared.component';

describe('ItemSubTabTabDetailedListInteractiveSharedComponent', () => {
  let component: ItemSubTabTabDetailedListInteractiveSharedComponent;
  let fixture: ComponentFixture<ItemSubTabTabDetailedListInteractiveSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSubTabTabDetailedListInteractiveSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSubTabTabDetailedListInteractiveSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
