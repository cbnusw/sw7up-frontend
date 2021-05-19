import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EHelpFormPageComponent } from './e-help-form-page.component';

describe('EHelpFormPageComponent', () => {
  let component: EHelpFormPageComponent;
  let fixture: ComponentFixture<EHelpFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EHelpFormPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EHelpFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
