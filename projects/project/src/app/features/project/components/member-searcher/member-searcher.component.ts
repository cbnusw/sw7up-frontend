import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IUserInfo } from 'shared';
import { AccountService } from '../../../../services';

@Component({
  selector: 'sw-member-searcher',
  templateUrl: './member-searcher.component.html',
  styleUrls: ['./member-searcher.component.scss'],
  providers: [AccountService],
})
export class MemberSearcherComponent implements OnInit, OnDestroy {

  keywordControl: FormControl = new FormControl('');
  @Output() memberSelect: EventEmitter<IUserInfo> = new EventEmitter<IUserInfo>();

  private _subscription = new Subscription();

  constructor(
    public accountService: AccountService,
  ) {
  }

  ngOnInit(): void {
    this._subscription.add(
      this.keywordControl.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
      ).subscribe(keyword => this.accountService.search(keyword))
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
