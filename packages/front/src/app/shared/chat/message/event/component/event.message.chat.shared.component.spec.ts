import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMessageChatSharedComponent } from './event.message.chat.shared.component';

describe('EventMessageChatSharedComponent', () => {
  let component: EventMessageChatSharedComponent;
  let fixture: ComponentFixture<EventMessageChatSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventMessageChatSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventMessageChatSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
