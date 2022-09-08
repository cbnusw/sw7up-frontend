import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubAccountsComponent } from './github-accounts.component';

describe('GithubAccoutsComponent', () => {
  let component: GithubAccountsComponent;
  let fixture: ComponentFixture<GithubAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
