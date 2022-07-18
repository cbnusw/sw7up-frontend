import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentActifityListPageComponent } from './student-actifity-list-page.component';

describe('StudentActifityListPageComponent', () => {
  let component: StudentActifityListPageComponent;
  let fixture: ComponentFixture<StudentActifityListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentActifityListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentActifityListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
