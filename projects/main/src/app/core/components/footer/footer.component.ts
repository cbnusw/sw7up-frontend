import { Component, OnInit } from '@angular/core';
import { URLS } from '../../../constants/urls';
import { OrganizationService } from '../../../services/organization.service';

@Component({
  selector: 'sw-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  readonly PRIVACY_URL = URLS.POLICY.PRIVACY;
  readonly SITEMAP_URL = URLS.POLICY.SITEMAP;
  readonly CLEAN_URL = URLS.POLICY.CLEAN;

  address: string;
  tel: string;

  constructor(private organizationService: OrganizationService) {
  }

  ngOnInit(): void {
    this.organizationService.organization$.subscribe(org => {
      const { address, tel } = org || {};
      this.address = `${address.basic} ${address.detail}`.trim();
      this.tel = tel;
    });
  }
}
