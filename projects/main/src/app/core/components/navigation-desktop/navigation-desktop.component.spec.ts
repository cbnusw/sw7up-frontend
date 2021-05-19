import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationDesktopComponent } from './navigation-desktop.component';

describe('NavigationDesktopComponent', () => {
  let component: NavigationDesktopComponent;
  let fixture: ComponentFixture<NavigationDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationDesktopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
