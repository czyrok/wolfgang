import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultProfileMainViewComponent } from './default.profile.main.view.component';

describe('DefaultProfileMainViewComponent', () => {
  let component: DefaultProfileMainViewComponent;
  let fixture: ComponentFixture<DefaultProfileMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultProfileMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultProfileMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
