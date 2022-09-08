import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementLanguagesPageComponent } from './management-languages-page.component';

describe('ManagementLanguagesPageComponent', () => {
  let component: ManagementLanguagesPageComponent;
  let fixture: ComponentFixture<ManagementLanguagesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementLanguagesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementLanguagesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
