import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGithubAccountsPageComponent } from './my-github-accounts-page.component';

describe('MyGithubAccountsPageComponent', () => {
  let component: MyGithubAccountsPageComponent;
  let fixture: ComponentFixture<MyGithubAccountsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyGithubAccountsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGithubAccountsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
