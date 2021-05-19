import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthGuard } from '../../guards/not-auth.guard';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  { path: 'login', canActivate: [NotAuthGuard], component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountPagesRoutingModule {
}
