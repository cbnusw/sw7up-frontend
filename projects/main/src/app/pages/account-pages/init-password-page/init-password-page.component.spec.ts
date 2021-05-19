import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitPasswordPageComponent } from './init-password-page.component';

describe('InitPasswordPageComponent', () => {
  let component: InitPasswordPageComponent;
  let fixture: ComponentFixture<InitPasswordPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitPasswordPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitPasswordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
