import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableLanguagesComponent } from './available-languages.component';

describe('AvailableLanguagesComponent', () => {
  let component: AvailableLanguagesComponent;
  let fixture: ComponentFixture<AvailableLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableLanguagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
