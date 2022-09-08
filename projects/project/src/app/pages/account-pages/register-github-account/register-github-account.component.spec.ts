import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterGithubAccountComponent } from './register-github-account.component';

describe('RegisterGithubAccountComponent', () => {
  let component: RegisterGithubAccountComponent;
  let fixture: ComponentFixture<RegisterGithubAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterGithubAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterGithubAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
