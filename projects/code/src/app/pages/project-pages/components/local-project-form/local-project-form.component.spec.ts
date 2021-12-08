import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalProjectFormComponent } from './local-project-form.component';

describe('LocalProjectFormComponent', () => {
  let component: LocalProjectFormComponent;
  let fixture: ComponentFixture<LocalProjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalProjectFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
