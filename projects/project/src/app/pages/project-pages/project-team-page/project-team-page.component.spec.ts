import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTeamPageComponent } from './project-team-page.component';

describe('ProjectTeamFormPageComponent', () => {
  let component: ProjectTeamPageComponent;
  let fixture: ComponentFixture<ProjectTeamPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTeamPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTeamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
