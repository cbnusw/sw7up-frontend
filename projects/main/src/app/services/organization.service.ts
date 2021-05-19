import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { OrganizationService as OrgService } from 'shared';
import { IOrganization } from '../../../../shared/src/lib/models/organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private organizationSubject: BehaviorSubject<IOrganization> = new BehaviorSubject<IOrganization>(null);
  organization$: Observable<IOrganization>;

  constructor(private organizationService: OrgService) {
    this.organization$ = this.organizationSubject.asObservable().pipe(filter(org => !!org), take(1));
    this.organizationService.getOrganization().subscribe(res => this.organizationSubject.next(res.data));
  }
}
