import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOssComponent } from './project-oss.component';

describe('ProjectOssComponent', () => {
  let component: ProjectOssComponent;
  let fixture: ComponentFixture<ProjectOssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectOssComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectOssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
