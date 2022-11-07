import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyCompanyPageComponent } from './family-company-page.component';

describe('FamilyCompanyPageComponent', () => {
  let component: FamilyCompanyPageComponent;
  let fixture: ComponentFixture<FamilyCompanyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyCompanyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyCompanyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
