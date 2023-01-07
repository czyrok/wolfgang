import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockPageViewComponent } from './block.page.view.component';

describe('BlockPageViewComponent', () => {
  let component: BlockPageViewComponent;
  let fixture: ComponentFixture<BlockPageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockPageViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockPageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
