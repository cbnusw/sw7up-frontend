import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterChartsComponent } from './semester-charts.component';

describe('SemesterChartsComponent', () => {
  let component: SemesterChartsComponent;
  let fixture: ComponentFixture<SemesterChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemesterChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
