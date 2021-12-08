import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared';
import { GithubAccountManagementPageComponent } from './github-account-management-page/github-account-management-page.component';

const routes: Routes = [
  {
    path: 'github', canActivate: [AuthGuard], component: GithubAccountManagementPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountPagesRoutingModule { }
