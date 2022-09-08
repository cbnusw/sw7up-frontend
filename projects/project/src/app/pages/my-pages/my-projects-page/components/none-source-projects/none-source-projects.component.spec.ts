import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoneSourceProjectsComponent } from './none-source-projects.component';

describe('NoneSourceProjectsComponent', () => {
  let component: NoneSourceProjectsComponent;
  let fixture: ComponentFixture<NoneSourceProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoneSourceProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoneSourceProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
