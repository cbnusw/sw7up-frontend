import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EHelpListPageComponent } from './e-help-list-page.component';

describe('EHelpListPageComponent', () => {
  let component: EHelpListPageComponent;
  let fixture: ComponentFixture<EHelpListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EHelpListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EHelpListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
