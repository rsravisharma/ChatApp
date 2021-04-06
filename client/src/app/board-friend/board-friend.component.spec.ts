import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardFriendComponent } from './board-friend.component';

describe('BoardFriendComponent', () => {
  let component: BoardFriendComponent;
  let fixture: ComponentFixture<BoardFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardFriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
