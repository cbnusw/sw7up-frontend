import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMetaChartsComponent } from './project-meta-charts.component';

describe('MetaChartsComponent', () => {
  let component: ProjectMetaChartsComponent;
  let fixture: ComponentFixture<ProjectMetaChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectMetaChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMetaChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
