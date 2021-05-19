import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationMainPageComponent } from './organization-main-page.component';

describe('OrganizationMainPageComponent', () => {
  let component: OrganizationMainPageComponent;
  let fixture: ComponentFixture<OrganizationMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
