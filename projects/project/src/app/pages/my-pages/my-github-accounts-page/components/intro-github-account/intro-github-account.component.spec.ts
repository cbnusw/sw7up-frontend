import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroGithubAccountComponent } from './intro-github-account.component';

describe('IntroGithubAccountComponent', () => {
  let component: IntroGithubAccountComponent;
  let fixture: ComponentFixture<IntroGithubAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroGithubAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroGithubAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
