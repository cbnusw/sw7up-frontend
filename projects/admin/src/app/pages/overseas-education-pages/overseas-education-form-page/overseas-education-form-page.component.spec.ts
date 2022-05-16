import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverseasEducationFormPageComponent } from './overseas-education-form-page.component';

describe('OverseasEducationFormPageComponent', () => {
  let component: OverseasEducationFormPageComponent;
  let fixture: ComponentFixture<OverseasEducationFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverseasEducationFormPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverseasEducationFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
