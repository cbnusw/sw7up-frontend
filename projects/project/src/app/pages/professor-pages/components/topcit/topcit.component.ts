import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { StatService, StudentTopcitDto, TopcitStatDto } from '../../../../services/stat.service';
import { StudentDto } from '../../services/student.service';

@Component({
  selector: 'sw-topcit',
  templateUrl: './topcit.component.html',
  styleUrls: ['./topcit.component.scss'],
})
export class TopcitComponent implements OnInit {
  @Input() student: StudentDto;

  topcit: StudentTopcitDto = null;
  topcitStats: TopcitStatDto[] = null;

  constructor(private _statService: StatService) {
  }

  ngOnInit(): void {
    this._statService.getStudentTopcits(this.student.no).pipe(
      map(topcits => topcits[0] || null),
      tap(topcit => this.topcit = topcit || null),
      switchMap((topcit => {
          if (!topcit) {
            return of(null);
          }
          return this._statService.getTopcitStats(topcit.no);
        })
      )).subscribe(stat => this.topcitStats = stat);
  }
}
