import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTabTabListDetailedInteractiveSharedComponent } from './sub-tab.tab.list-detailed.interactive.shared.component';


describe('SubTabTabListDetailedInteractiveSharedComponent', () => {
  let component: SubTabTabListDetailedInteractiveSharedComponent;
  let fixture: ComponentFixture<SubTabTabListDetailedInteractiveSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubTabTabListDetailedInteractiveSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubTabTabListDetailedInteractiveSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
