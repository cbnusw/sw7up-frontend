import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageChartsComponent } from './language-charts.component';

describe('LanguageChartsComponent', () => {
  let component: LanguageChartsComponent;
  let fixture: ComponentFixture<LanguageChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
