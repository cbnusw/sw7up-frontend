import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalProjectListComponent } from './local-project-list.component';

describe('LocalProjectListComponent', () => {
  let component: LocalProjectListComponent;
  let fixture: ComponentFixture<LocalProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalProjectListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
