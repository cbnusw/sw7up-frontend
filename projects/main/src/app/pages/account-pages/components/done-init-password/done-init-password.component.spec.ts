import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneInitPasswordComponent } from './done-init-password.component';

describe('DoneInitPasswordComponent', () => {
  let component: DoneInitPasswordComponent;
  let fixture: ComponentFixture<DoneInitPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoneInitPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoneInitPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
