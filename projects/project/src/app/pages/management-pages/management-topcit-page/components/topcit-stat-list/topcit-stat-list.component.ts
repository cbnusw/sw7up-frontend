import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ConvertedTopcitStatDto, TopcitStatManagementService } from '../../services/topcit-stat-management.service';

@Component({
  selector: 'sw-topcit-stat-list',
  templateUrl: './topcit-stat-list.component.html',
  styleUrls: ['./topcit-stat-list.component.scss']
})
export class TopcitStatListComponent implements OnInit, OnDestroy {
  pending = false;
  template: string;

  private readonly _BASE_TEMPLATE = '80px 120px 100px 80px 80px';
  private readonly _CONTROL_SIZE = '80px';
  private readonly _SUBJECT_SIZE = '120px';
  private readonly _subscription = new Subscription();

  constructor(public readonly service: TopcitStatManagementService) {
    this.template = this._calcuateTemplate([]);
  }

  remove(document: ConvertedTopcitStatDto): void {
    const yes = confirm(`${document.year}년 ${document.no}회 ${document.category} 데이터를 삭제하시겠습니까?`);
    if (yes) {
      this.pending = true;
      this.service.removeTopcitStat(document._id).pipe(
        finalize(() => this.pending = false)
      ).subscribe();
    }
  }

  ngOnInit(): void {
    this._subscription.add(
      this.service.subjectNames$.subscribe(names => this.template = this._calcuateTemplate(names))
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _calcuateTemplate(names: string[]): string {
    return [this._BASE_TEMPLATE, ...names.map(_ => this._SUBJECT_SIZE), this._CONTROL_SIZE].join(' ');
  }
}
