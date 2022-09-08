import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalSourcesComponent } from './local-sources.component';

describe('LocalSourcesComponent', () => {
  let component: LocalSourcesComponent;
  let fixture: ComponentFixture<LocalSourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalSourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalSourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
