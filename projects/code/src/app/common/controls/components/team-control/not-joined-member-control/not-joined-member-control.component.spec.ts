import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotJoinedMemberControlComponent } from './not-joined-member-control.component';

describe('NotJoinedMemberControlComponent', () => {
  let component: NotJoinedMemberControlComponent;
  let fixture: ComponentFixture<NotJoinedMemberControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotJoinedMemberControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotJoinedMemberControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
