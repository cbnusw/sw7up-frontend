import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentGuard } from '../../common/guards/student.guard';
import { RegisterGithubAccountComponent } from './register-github-account/register-github-account.component';

const routes: Routes = [
  {
    path: 'github',
    canActivate: [StudentGuard],
    component: RegisterGithubAccountComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountPagesRoutingModule {
}
