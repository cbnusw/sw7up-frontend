import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStatisticsPageComponent } from './my-statistics-page.component';

describe('MyStatisticsPageComponent', () => {
  let component: MyStatisticsPageComponent;
  let fixture: ComponentFixture<MyStatisticsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyStatisticsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStatisticsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
