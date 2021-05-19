import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvergencePageComponent } from './convergence-page.component';

describe('ConvergencePageComponent', () => {
  let component: ConvergencePageComponent;
  let fixture: ComponentFixture<ConvergencePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvergencePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvergencePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
