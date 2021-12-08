import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalProjectPageComponent } from './local-project-page.component';

describe('LocalProjectPageComponent', () => {
  let component: LocalProjectPageComponent;
  let fixture: ComponentFixture<LocalProjectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalProjectPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
