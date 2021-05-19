import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAccountPageComponent } from './find-account-page.component';

describe('FindAccountPageComponent', () => {
  let component: FindAccountPageComponent;
  let fixture: ComponentFixture<FindAccountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindAccountPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
