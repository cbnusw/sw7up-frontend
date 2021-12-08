import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubAuthorizationComponent } from './github-authorization.component';

describe('GithubAuthorizationComponent', () => {
  let component: GithubAuthorizationComponent;
  let fixture: ComponentFixture<GithubAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubAuthorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
