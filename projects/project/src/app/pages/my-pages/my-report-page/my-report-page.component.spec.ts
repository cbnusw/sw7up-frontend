import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReportPageComponent } from './my-report-page.component';

describe('MyReportSettingPageComponent', () => {
  let component: MyReportPageComponent;
  let fixture: ComponentFixture<MyReportPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyReportPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
