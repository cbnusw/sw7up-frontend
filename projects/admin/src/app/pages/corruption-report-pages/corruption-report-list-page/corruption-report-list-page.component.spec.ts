import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorruptionReportListPageComponent } from './corruption-report-list-page.component';

describe('CorruptionReportListPageComponent', () => {
  let component: CorruptionReportListPageComponent;
  let fixture: ComponentFixture<CorruptionReportListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorruptionReportListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorruptionReportListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
