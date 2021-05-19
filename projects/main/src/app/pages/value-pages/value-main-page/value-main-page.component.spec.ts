import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueMainPageComponent } from './value-main-page.component';

describe('ValueMainPageComponent', () => {
  let component: ValueMainPageComponent;
  let fixture: ComponentFixture<ValueMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
