import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBasicComponent } from './project-basic.component';

describe('ProjectBasicComponent', () => {
  let component: ProjectBasicComponent;
  let fixture: ComponentFixture<ProjectBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
