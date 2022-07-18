import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentActivityDetailPageComponent } from './student-activity-detail-page.component';

describe('StudentActivityDetailPageComponent', () => {
  let component: StudentActivityDetailPageComponent;
  let fixture: ComponentFixture<StudentActivityDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentActivityDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentActivityDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
