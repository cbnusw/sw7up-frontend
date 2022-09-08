import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnProjectInputComponent } from './own-project-input.component';

describe('OwnProjectInputComponent', () => {
  let component: OwnProjectInputComponent;
  let fixture: ComponentFixture<OwnProjectInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnProjectInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnProjectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
