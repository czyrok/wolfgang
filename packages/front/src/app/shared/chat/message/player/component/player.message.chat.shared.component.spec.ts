import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerMessageChatSharedComponent } from './player.message.chat.shared.component';

describe('PlayerMessageChatSharedComponent', () => {
  let component: PlayerMessageChatSharedComponent;
  let fixture: ComponentFixture<PlayerMessageChatSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerMessageChatSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerMessageChatSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
