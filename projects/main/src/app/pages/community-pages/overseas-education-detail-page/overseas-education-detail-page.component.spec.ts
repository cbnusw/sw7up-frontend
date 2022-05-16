import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverseasEducationDetailPageComponent } from './overseas-education-detail-page.component';

describe('OverseasEducationDetailPageComponent', () => {
  let component: OverseasEducationDetailPageComponent;
  let fixture: ComponentFixture<OverseasEducationDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverseasEducationDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverseasEducationDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
