import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentoListInputComponent } from './mento-list-input.component';

describe('MentoInputComponent', () => {
  let component: MentoListInputComponent;
  let fixture: ComponentFixture<MentoListInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentoListInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentoListInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
