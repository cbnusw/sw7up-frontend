import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementProjectsPageComponent } from './management-projects-page.component';

describe('ManagementProjectsPageComponent', () => {
  let component: ManagementProjectsPageComponent;
  let fixture: ComponentFixture<ManagementProjectsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementProjectsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementProjectsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
