import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanDetailPageComponent } from './clean-detail-page.component';

describe('CleanDetailPageComponent', () => {
  let component: CleanDetailPageComponent;
  let fixture: ComponentFixture<CleanDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleanDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
