import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubProjectFormComponent } from './github-project-form.component';

describe('GithubProjectFormComponent', () => {
  let component: GithubProjectFormComponent;
  let fixture: ComponentFixture<GithubProjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubProjectFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
