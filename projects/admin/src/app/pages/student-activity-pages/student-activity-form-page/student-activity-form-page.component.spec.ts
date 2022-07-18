import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentActivityFormPageComponent } from './student-activity-form-page.component';

describe('StudentActivityFormPageComponent', () => {
  let component: StudentActivityFormPageComponent;
  let fixture: ComponentFixture<StudentActivityFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentActivityFormPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentActivityFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
