import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EHelpDetailPageComponent } from './e-help-detail-page.component';

describe('EHelpDetailPageComponent', () => {
  let component: EHelpDetailPageComponent;
  let fixture: ComponentFixture<EHelpDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EHelpDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EHelpDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
