import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementMainPageComponent } from './management-main-page.component';

describe('ManagementMainPageComponent', () => {
  let component: ManagementMainPageComponent;
  let fixture: ComponentFixture<ManagementMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
