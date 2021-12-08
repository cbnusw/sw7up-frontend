import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubAccountListComponent } from './github-account-list.component';

describe('GithubAccountListComponent', () => {
  let component: GithubAccountListComponent;
  let fixture: ComponentFixture<GithubAccountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubAccountListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
