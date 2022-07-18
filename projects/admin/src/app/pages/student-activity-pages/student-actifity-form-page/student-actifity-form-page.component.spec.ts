import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentActifityFormPageComponent } from './student-actifity-form-page.component';

describe('StudentActifityFormPageComponent', () => {
  let component: StudentActifityFormPageComponent;
  let fixture: ComponentFixture<StudentActifityFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentActifityFormPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentActifityFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
