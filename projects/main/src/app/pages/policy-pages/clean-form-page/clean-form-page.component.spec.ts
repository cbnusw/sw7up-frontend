import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanFormPageComponent } from './clean-form-page.component';

describe('CleanFormPageComponent', () => {
  let component: CleanFormPageComponent;
  let fixture: ComponentFixture<CleanFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleanFormPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
