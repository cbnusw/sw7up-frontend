import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCardImageComponent } from './project-card-image.component';

describe('ProjectCardImageComponent', () => {
  let component: ProjectCardImageComponent;
  let fixture: ComponentFixture<ProjectCardImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCardImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCardImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
