import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinCustomizationProfileMainViewComponent } from './skin-customization.profile.main.view.component';

describe('SkinCustomizationMainViewComponent', () => {
  let component: SkinCustomizationProfileMainViewComponent;
  let fixture: ComponentFixture<SkinCustomizationProfileMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkinCustomizationProfileMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkinCustomizationProfileMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
