import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorruptionReportDetailPageComponent } from './corruption-report-detail-page.component';

describe('CorruptionReportDetailPageComponent', () => {
  let component: CorruptionReportDetailPageComponent;
  let fixture: ComponentFixture<CorruptionReportDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorruptionReportDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorruptionReportDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
