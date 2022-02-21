import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageManagementPageComponent } from './language-management-page.component';

describe('LanguageManagementPageComponent', () => {
  let component: LanguageManagementPageComponent;
  let fixture: ComponentFixture<LanguageManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageManagementPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
