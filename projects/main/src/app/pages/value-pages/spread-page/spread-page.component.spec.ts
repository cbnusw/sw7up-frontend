import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadPageComponent } from './spread-page.component';

describe('SpreadPageComponent', () => {
  let component: SpreadPageComponent;
  let fixture: ComponentFixture<SpreadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpreadPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpreadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
