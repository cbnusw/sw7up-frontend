import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoneMemberComponent } from './none-member.component';

describe('NoneMemberComponent', () => {
  let component: NoneMemberComponent;
  let fixture: ComponentFixture<NoneMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoneMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoneMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
