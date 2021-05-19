import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinePageComponent } from './online-page.component';

describe('OnlinePageComponent', () => {
  let component: OnlinePageComponent;
  let fixture: ComponentFixture<OnlinePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlinePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
