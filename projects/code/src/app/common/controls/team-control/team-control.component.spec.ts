import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamControlComponent } from './team-control.component';

describe('TeamControlComponent', () => {
  let component: TeamControlComponent;
  let fixture: ComponentFixture<TeamControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
