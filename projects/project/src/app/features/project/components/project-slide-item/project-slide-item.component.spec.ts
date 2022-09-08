import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSlideItemComponent } from './project-slide-item.component';

describe('ProjectSlideItemComponent', () => {
  let component: ProjectSlideItemComponent;
  let fixture: ComponentFixture<ProjectSlideItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectSlideItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSlideItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
