import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperateMainPageComponent } from './cooperate-main-page.component';

describe('CooperateMainPageComponent', () => {
  let component: CooperateMainPageComponent;
  let fixture: ComponentFixture<CooperateMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CooperateMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CooperateMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
