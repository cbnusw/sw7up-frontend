import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProjectsDialogComponent } from './register-projects-dialog.component';

describe('RegisterProjectsDialogComponent', () => {
  let component: RegisterProjectsDialogComponent;
  let fixture: ComponentFixture<RegisterProjectsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterProjectsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterProjectsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
