import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementRankingPageComponent } from './management-ranking-page.component';

describe('ManagementRankingPageComponent', () => {
  let component: ManagementRankingPageComponent;
  let fixture: ComponentFixture<ManagementRankingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementRankingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementRankingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
