import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSourcePageComponent } from './project-source-page.component';

describe('ProjectSourceFormPageComponent', () => {
  let component: ProjectSourcePageComponent;
  let fixture: ComponentFixture<ProjectSourcePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectSourcePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSourcePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
