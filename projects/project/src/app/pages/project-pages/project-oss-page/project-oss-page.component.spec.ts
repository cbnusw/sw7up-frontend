import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOssPageComponent } from './project-oss-page.component';

describe('ProjectOssFormPageComponent', () => {
  let component: ProjectOssPageComponent;
  let fixture: ComponentFixture<ProjectOssPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectOssPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectOssPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
