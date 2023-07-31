import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementProjectFiltersComponent } from './management-project-filters.component';

describe('ProjectFilterComponent', () => {
  let component: ManagementProjectFiltersComponent;
  let fixture: ComponentFixture<ManagementProjectFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementProjectFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementProjectFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
