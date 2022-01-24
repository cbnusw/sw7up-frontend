import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractSearchDirective, IListResponse, IParams, IUserInfo } from 'shared';
import { AccountService } from '../../../../../services/account.service';

@Component({
  selector: 'sw-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent extends AbstractSearchDirective<IUserInfo> {

  @Output() selectChange: EventEmitter<IUserInfo> = new EventEmitter<IUserInfo>();

  constructor(private accountService: AccountService) {
    super({ limit: 10 }, ['no', 'name']);
  }

  selectMember(document: IUserInfo): void {
    this.selectChange.emit(document);
  }

  protected requestObservable(params?: IParams): Observable<IListResponse<IUserInfo>> {
    return this.accountService.searchAccounts(params);
  }
}
