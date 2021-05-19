import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyPageComponent } from './easy-page.component';

describe('EasyPageComponent', () => {
  let component: EasyPageComponent;
  let fixture: ComponentFixture<EasyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EasyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EasyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
