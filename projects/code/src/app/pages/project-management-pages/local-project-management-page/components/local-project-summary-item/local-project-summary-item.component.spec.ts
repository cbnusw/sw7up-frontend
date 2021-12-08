import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalProjectSummaryItemComponent } from './local-project-summary-item.component';

describe('LocalProjectSummaryItemComponent', () => {
  let component: LocalProjectSummaryItemComponent;
  let fixture: ComponentFixture<LocalProjectSummaryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalProjectSummaryItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalProjectSummaryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
