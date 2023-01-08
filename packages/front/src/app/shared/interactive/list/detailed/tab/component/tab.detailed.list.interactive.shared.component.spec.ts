import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabDetailedListInteractiveSharedComponent } from './tab.detailed.list.interactive.shared.component';

describe('TabDetailedListInteractiveSharedComponent', () => {
  let component: TabDetailedListInteractiveSharedComponent;
  let fixture: ComponentFixture<TabDetailedListInteractiveSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabDetailedListInteractiveSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabDetailedListInteractiveSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
