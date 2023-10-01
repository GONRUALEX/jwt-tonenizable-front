import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { IsAdminGuard } from 'src/app/core/guards/prod-guard.service';

const routes: Routes = [
  {path:'', component: PrincipalComponent, canActivate:[IsAdminGuard], data:{expectedRol: ['admin', 'user']}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
