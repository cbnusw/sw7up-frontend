import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSlidePageComponent } from './project-slide-page.component';

describe('ProjectSlideFormPageComponent', () => {
  let component: ProjectSlidePageComponent;
  let fixture: ComponentFixture<ProjectSlidePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectSlidePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSlidePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
