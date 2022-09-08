import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSlideUploaderComponent } from './project-slide-uploader.component';

describe('ProjectSlideUploaderComponent', () => {
  let component: ProjectSlideUploaderComponent;
  let fixture: ComponentFixture<ProjectSlideUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectSlideUploaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSlideUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
