import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorListPageComponent } from './operator-list-page.component';

describe('OperatorListPageComponent', () => {
  let component: OperatorListPageComponent;
  let fixture: ComponentFixture<OperatorListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
