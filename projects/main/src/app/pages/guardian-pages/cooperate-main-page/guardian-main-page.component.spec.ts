import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardianMainPageComponent } from './guardian-main-page.component';

describe('GuardianMainPageComponent', () => {
  let component: GuardianMainPageComponent;
  let fixture: ComponentFixture<GuardianMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardianMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardianMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
