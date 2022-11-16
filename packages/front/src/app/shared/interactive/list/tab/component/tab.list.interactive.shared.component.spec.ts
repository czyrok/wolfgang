import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabListInteractiveSharedComponent } from './tab.list.interactive.shared.component';

describe('TabListInteractiveSharedComponent', () => {
  let component: TabListInteractiveSharedComponent;
  let fixture: ComponentFixture<TabListInteractiveSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabListInteractiveSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabListInteractiveSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
