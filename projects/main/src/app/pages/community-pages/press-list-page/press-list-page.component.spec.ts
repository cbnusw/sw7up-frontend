import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressListPageComponent } from './press-list-page.component';

describe('PressListPageComponent', () => {
  let component: PressListPageComponent;
  let fixture: ComponentFixture<PressListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PressListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PressListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
