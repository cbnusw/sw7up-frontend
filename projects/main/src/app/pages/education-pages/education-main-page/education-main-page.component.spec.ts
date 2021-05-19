import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationMainPageComponent } from './education-main-page.component';

describe('EducationMainPageComponent', () => {
  let component: EducationMainPageComponent;
  let fixture: ComponentFixture<EducationMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
