import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalProjectManagementPageComponent } from './local-project-management-page.component';

describe('LocalProjectListPageComponent', () => {
  let component: LocalProjectManagementPageComponent;
  let fixture: ComponentFixture<LocalProjectManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalProjectManagementPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalProjectManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
