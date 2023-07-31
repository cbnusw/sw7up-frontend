import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ProfessorMenuService } from '../services/professor-menu-service';
import { StudentDto, StudentService } from '../services/student.service';

@Component({
  selector: 'sw-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.scss']
})
export class StudentPageComponent implements OnInit, OnDestroy {
  student: StudentDto;
  private readonly _subscription = new Subscription();

  constructor(private readonly _service: StudentService,
              private readonly _router: Router,
              private readonly _route: ActivatedRoute,
              private readonly _menuService: ProfessorMenuService) {
  }

  ngOnInit(): void {
    this._subscribe();
    setTimeout(() => this._menuService.show = false, 0);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this._menuService.show = true;
  }

  private _subscribe(): void {
    this._subscribeStudent();
  }

  private _subscribeStudent(): void {
    let id: string;
    this._subscription.add(
      this._route.params.pipe(
        tap(params => id = params.id),
        switchMap(() => this._service.students$),
        map(students => students.find(student => student._id === id)),
      ).subscribe(student => {
        if (!student) {
          alert('찾을 수 없는 지도학생입니다.');
          this._router.navigateByUrl('/professor');
        }
        this.student = student;
      })
    );
  }
}
