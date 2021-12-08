import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalProjectFormPageComponent } from './local-project-form-page.component';

describe('LocalProjectFormPageComponent', () => {
  let component: LocalProjectFormPageComponent;
  let fixture: ComponentFixture<LocalProjectFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalProjectFormPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalProjectFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
