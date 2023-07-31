import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ITabOption } from '../../../../common/controls/components';
import { StatService, StudentTopcitDto, TopcitStatDto } from '../../../../services/stat.service';
import { StudentDto } from '../../../professor-pages/services/student.service';

@Component({
  selector: 'sw-topcits',
  templateUrl: './topcits.component.html',
  styleUrls: ['./topcits.component.scss'],
})
export class TopcitsComponent implements OnInit {
  @Input() student: StudentDto;

  topcitOptions: ITabOption[] = [];
  selected: ITabOption;
  topcits: StudentTopcitDto[] = [];
  topcitStats: TopcitStatDto[] = null;

  constructor(private _statService: StatService) {
  }

  get topcit(): StudentTopcitDto | null {
    if (typeof this.selected?.value === 'number') {
      return this.topcits[this.selected.value];
    }
    return null;
  }

  ngOnInit(): void {
    this._statService.getStudentTopcits(this.student.no).pipe(
      tap(topcits => {
        this.topcits = topcits;
        this.topcitOptions = topcits.map((topcit, i) => ({ viewValue: `${topcit.no}회(${topcit.year}년)`, value: i }));
        this.selected = this.topcitOptions[0];
      }),
      switchMap((topcits => {
          if (topcits.length === 0) {
            return of(null);
          }
          return this._statService.getTopcitStats(topcits[0].no);
        })
      )).subscribe(stat => this.topcitStats = stat);
  }

  changeTopcitOption(option: ITabOption): void {
    this.selected = option;
    this._statService.getTopcitStats(this.topcit.no).subscribe(stat => this.topcitStats = stat);
  }
}
