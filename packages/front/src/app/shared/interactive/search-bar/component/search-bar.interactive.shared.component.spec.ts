import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarInteractiveShared } from './search-bar.interactive.shared.component';

describe('SearchBarInteractiveShared', () => {
  let component: SearchBarInteractiveShared;
  let fixture: ComponentFixture<SearchBarInteractiveShared>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBarInteractiveShared ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarInteractiveShared);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
