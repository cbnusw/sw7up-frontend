import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProjectManagementPageComponent } from './public-project-management-page.component';

describe('PublicProjectListPageComponent', () => {
  let component: PublicProjectManagementPageComponent;
  let fixture: ComponentFixture<PublicProjectManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicProjectManagementPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicProjectManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
