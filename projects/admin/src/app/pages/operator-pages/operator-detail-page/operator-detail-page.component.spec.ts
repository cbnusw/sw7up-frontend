import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorDetailPageComponent } from './operator-detail-page.component';

describe('OperatorDetailPageComponent', () => {
  let component: OperatorDetailPageComponent;
  let fixture: ComponentFixture<OperatorDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
