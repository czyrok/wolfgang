import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTabTabDetailedListInteractiveSharedComponent } from './sub-tab.tab.detailed.list.interactive.shared.component';


describe('SubTabTabDetailedListInteractiveSharedComponent', () => {
  let component: SubTabTabDetailedListInteractiveSharedComponent;
  let fixture: ComponentFixture<SubTabTabDetailedListInteractiveSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubTabTabDetailedListInteractiveSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubTabTabDetailedListInteractiveSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
