import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PAGE_NAMES, URLS } from '../../constants/urls';
import { BasicPageComponent } from './basic-page/basic-page.component';
import { ConvergencePageComponent } from './convergence-page/convergence-page.component';
import { EasyDetailPageComponent } from './easy-detail-page/easy-detail-page.component';
import { EasyPageComponent } from './easy-page/easy-page.component';
import { EducationMainPageComponent } from './education-main-page/education-main-page.component';
import { MajorPageComponent } from './major-page/major-page.component';
import { MileagePageComponent } from './mileage-page/mileage-page.component';
import { OnlinePageComponent } from './online-page/online-page.component';
import { OssPageComponent } from './oss-page/oss-page.component';

const routes: Routes = [
  {
    path: '', component: EducationMainPageComponent, children: [
      { path: '', redirectTo: URLS.EDUCATION.BASIC, pathMatch: 'full' },
      { path: PAGE_NAMES.EDUCATION.BASIC, component: BasicPageComponent },
      { path: PAGE_NAMES.EDUCATION.MAJOR, component: MajorPageComponent },
      { path: PAGE_NAMES.EDUCATION.CONVERGENCE, component: ConvergencePageComponent },
      { path: PAGE_NAMES.EDUCATION.ONLINE, component: OnlinePageComponent },
      { path: PAGE_NAMES.EDUCATION.OSS, component: OssPageComponent },
      { path: PAGE_NAMES.EDUCATION.EASY, component: EasyPageComponent },
      { path: `${PAGE_NAMES.EDUCATION.EASY}/:index`, component: EasyDetailPageComponent },
      { path: PAGE_NAMES.EDUCATION.MILEAGE, component: MileagePageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EducationPagesRoutingModule {
}
