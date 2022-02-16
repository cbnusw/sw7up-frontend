import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSummaryItemComponent } from './project-summary-item.component';

describe('ProjectSummaryItemComponent', () => {
  let component: ProjectSummaryItemComponent;
  let fixture: ComponentFixture<ProjectSummaryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectSummaryItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSummaryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
