import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProjectListComponent } from './public-project-list.component';

describe('PublicProjectListComponent', () => {
  let component: PublicProjectListComponent;
  let fixture: ComponentFixture<PublicProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicProjectListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
