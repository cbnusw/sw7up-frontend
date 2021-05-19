import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityMainPageComponent } from './community-main-page.component';

describe('CommunityMainPageComponent', () => {
  let component: CommunityMainPageComponent;
  let fixture: ComponentFixture<CommunityMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
