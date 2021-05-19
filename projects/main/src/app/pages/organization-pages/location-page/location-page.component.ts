import { Component, OnInit } from '@angular/core';
import { IOrganization, PlatformService } from 'shared';
import { OrganizationService } from '../../../services/organization.service';

declare const kakao: any;
declare type TTrafficType = 'private' | 'public';

@Component({
  selector: 'sw-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.scss']
})
export class LocationPageComponent implements OnInit {

  organization: IOrganization;
  type: TTrafficType = 'private';

  constructor(private organizationService: OrganizationService,
              private platform: PlatformService) { }

  ngOnInit(): void {
    this.organizationService.organization$.subscribe(
      org => {
        this.organization = org;
        this.loadMap();
      }
    );
  }

  private loadMap(): void {
    if (this.platform.isBrowser) {
      const container = document.getElementById('map');
      const [lng, lat] = this.organization.location.coordinates;
      const options = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3,
      };
      const map = new kakao.maps.Map(container, options);
      const position = new kakao.maps.LatLng(lat, lng);
      const marker = new kakao.maps.Marker({ position });

      marker.setMap(map);

      const content =
`<div style="padding: 5px; font-size: 0.7em; width: 160px;">
  <strong>충북대학교 SW중심대학사업단</strong>
  <br/>
  <a href="https://map.kakao.com/link/map/충북대학교 SW중심대학사업단,${lat},${lng}"
     style="color:#0d6efd"
     target="_blank">큰지도보기</a>
     &nbsp;&nbsp;
   <a href="https://map.kakao.com/link/to/충북대학교 SW중심대학사업단,${lat},${lng}"
      style="color:#0d6efd"
      target="_blank">길찾기</a>
</div>`;
      const infoWindow = new kakao.maps.InfoWindow({ position, content });
      infoWindow.open(map, marker);
    }
  }

  changeType(type: TTrafficType): boolean {
    this.type = type;
    return false;
  }
}
