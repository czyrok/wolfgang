import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSubTabTabListDetailedInteractiveSharedComponent } from './item.sub-tab.tab.list-detailed.interactive.shared.component';

describe('ItemSubTabTabListDetailedInteractiveSharedComponent', () => {
  let component: ItemSubTabTabListDetailedInteractiveSharedComponent;
  let fixture: ComponentFixture<ItemSubTabTabListDetailedInteractiveSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSubTabTabListDetailedInteractiveSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSubTabTabListDetailedInteractiveSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
