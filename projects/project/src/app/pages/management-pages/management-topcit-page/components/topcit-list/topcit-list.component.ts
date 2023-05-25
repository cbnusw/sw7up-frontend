import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ConvertedTopcitDto, TopcitManagementService } from '../../services/topcit-management.service';

@Component({
  selector: 'sw-topcit-list',
  templateUrl: './topcit-list.component.html',
  styleUrls: ['./topcit-list.component.scss'],
})
export class TopcitListComponent implements OnInit, OnDestroy {
  pending = false;
  template: string;

  private readonly _BASE_TEMPLATE = '80px 80px 80px 150px 80px 100px 150px 80px 80px';
  private readonly _CONTROL_SIZE = '80px';
  private readonly _SUBJECT_SIZE = '140px';
  private readonly _subscription = new Subscription();

  constructor(public readonly service: TopcitManagementService) {
    this.template = this._calcuateTemplate([]);
  }

  remove(document: ConvertedTopcitDto): void {
    const yes = confirm(`${document.student.name}의 TOPCIT 정보를 삭제하시겠습니까?`);

    if (yes) {
      this.pending = true;
      this.service.removeTopcit(document._id).pipe(
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
