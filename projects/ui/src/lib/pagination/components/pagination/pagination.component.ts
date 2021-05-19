import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IParams } from 'shared';

@Component({
  selector: 'sw-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaginationComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;
  private _params: IParams;
  private _total: number;
  private _rangeSubject: BehaviorSubject<{ total: number; params: IParams; }> = new BehaviorSubject(null);

  range: number[] = [];
  @Input() size: number;
  // @Input() total: number;

  // @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private router: Router,
              private route: ActivatedRoute) {
    this.size = 3;
    this._total = 0;
  }

  @Input() set total(total: number) {
    this._total = total;
    this._rangeSubject.next({ total: this.total, params: this.params });
  }

  get total(): number {
    return this._total;
  }

  @Input() set params(params: IParams) {
    this._params = params;
    this._rangeSubject.next({ total: this.total, params: this._params });
  }

  get params(): IParams {
    return this._params;
  }

  get page(): number {
    return this.params ? +this.params.page : 1;
  }

  get limit(): number {
    return this.params ? +this.params.limit : null;
  }

  get lastPage(): number {
    if (this._total && this.limit) {
      return Math.ceil(this._total / this.limit);
    }
    return 1;
  }

  get url(): string {
    return this.router.url.split('?')[0];
  }

  getQueryParams(page: number): Params {
    const query = (this.params.q || '').split('=');
    const params = { ...this.params, page };

    if (query.length === 0) {
      delete params.q;
    } else if (query.length === 1) {
      params.q = query[0];
    } else {
      params.q = query[1];
    }

    return params;
  }

  private calcRange(): void {
    this.range = [];
    let begin;
    if (this.page <= this.size) {
      begin = 1;
    } else {
      begin = this.page;
    }

    for (let i = begin; i < begin + this.size && i <= this.lastPage; i++) {
      this.range.push(i);
    }

    if (this.range.length < this.size && this.range[0]) {
      while (this.range.length !== this.size && this.range[0] !== 1) {
        this.range.unshift(this.range[0] - 1);
      }
    }
  }

  ngOnInit(): void {
    this._subscription = this._rangeSubject.pipe(
      filter(res => res && !!res.total && !!res.params)
    ).subscribe(
      () => this.calcRange()
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
