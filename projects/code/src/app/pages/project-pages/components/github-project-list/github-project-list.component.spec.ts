import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubProjectListComponent } from './github-project-list.component';

describe('GithubProjectListComponent', () => {
  let component: GithubProjectListComponent;
  let fixture: ComponentFixture<GithubProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubProjectListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
