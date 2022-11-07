import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmersionEducationPageComponent } from './immersion-education-page.component';

describe('ImmersionEducationPageComponent', () => {
  let component: ImmersionEducationPageComponent;
  let fixture: ComponentFixture<ImmersionEducationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImmersionEducationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmersionEducationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
