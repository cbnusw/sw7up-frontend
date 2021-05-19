import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectivePageComponent } from './objective-page.component';

describe('ObjectivePageComponent', () => {
  let component: ObjectivePageComponent;
  let fixture: ComponentFixture<ObjectivePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectivePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectivePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
