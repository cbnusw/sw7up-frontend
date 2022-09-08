import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementStatisticsPageComponent } from './management-statistics-page.component';

describe('ManagementStatisticsPageComponent', () => {
  let component: ManagementStatisticsPageComponent;
  let fixture: ComponentFixture<ManagementStatisticsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementStatisticsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementStatisticsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
