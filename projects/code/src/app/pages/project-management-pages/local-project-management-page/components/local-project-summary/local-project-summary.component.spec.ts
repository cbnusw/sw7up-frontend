import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalProjectSummaryComponent } from './local-project-summary.component';

describe('LocalProjectSummaryComponent', () => {
  let component: LocalProjectSummaryComponent;
  let fixture: ComponentFixture<LocalProjectSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalProjectSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalProjectSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
