import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubAccountManagementPageComponent } from './github-account-management-page.component';

describe('GithubAccountManagementPageComponent', () => {
  let component: GithubAccountManagementPageComponent;
  let fixture: ComponentFixture<GithubAccountManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubAccountManagementPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubAccountManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
