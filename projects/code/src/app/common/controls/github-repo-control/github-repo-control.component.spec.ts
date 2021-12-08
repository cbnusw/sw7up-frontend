import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubRepoControlComponent } from './github-repo-control.component';

describe('GithubRepoControlComponent', () => {
  let component: GithubRepoControlComponent;
  let fixture: ComponentFixture<GithubRepoControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubRepoControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubRepoControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
