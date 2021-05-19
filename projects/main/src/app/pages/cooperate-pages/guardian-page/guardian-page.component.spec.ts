import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardianPageComponent } from './guardian-page.component';

describe('GuardianPageComponent', () => {
  let component: GuardianPageComponent;
  let fixture: ComponentFixture<GuardianPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardianPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardianPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
