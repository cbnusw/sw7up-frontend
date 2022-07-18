import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentActivityListPageComponent } from './student-activity-list-page.component';

describe('StudentActivityListPageComponent', () => {
  let component: StudentActivityListPageComponent;
  let fixture: ComponentFixture<StudentActivityListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentActivityListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentActivityListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
