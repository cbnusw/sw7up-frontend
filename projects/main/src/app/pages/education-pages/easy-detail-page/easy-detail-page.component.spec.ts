import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyDetailPageComponent } from './easy-detail-page.component';

describe('EasyDetailPageComponent', () => {
  let component: EasyDetailPageComponent;
  let fixture: ComponentFixture<EasyDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EasyDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EasyDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
