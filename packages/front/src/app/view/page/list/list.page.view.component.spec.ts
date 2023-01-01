import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPageViewComponent } from './list.page.view.component';

describe('ListPageViewComponent', () => {
  let component: ListPageViewComponent;
  let fixture: ComponentFixture<ListPageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPageViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
