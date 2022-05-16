import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverseasEducationListPageComponent } from './overseas-education-list-page.component';

describe('OverseasEducationListPageComponent', () => {
  let component: OverseasEducationListPageComponent;
  let fixture: ComponentFixture<OverseasEducationListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverseasEducationListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverseasEducationListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
