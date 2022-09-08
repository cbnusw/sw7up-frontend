import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSearcherComponent } from './member-searcher.component';

describe('MemberSearcherComponent', () => {
  let component: MemberSearcherComponent;
  let fixture: ComponentFixture<MemberSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberSearcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
