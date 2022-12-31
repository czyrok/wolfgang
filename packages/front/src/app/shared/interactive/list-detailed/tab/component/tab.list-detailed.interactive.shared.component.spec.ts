import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabListDetailedInteractiveSharedComponent } from './tab.list-detailed.interactive.shared.component';

describe('TabListDetailedInteractiveSharedComponent', () => {
  let component: TabListDetailedInteractiveSharedComponent;
  let fixture: ComponentFixture<TabListDetailedInteractiveSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabListDetailedInteractiveSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabListDetailedInteractiveSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
