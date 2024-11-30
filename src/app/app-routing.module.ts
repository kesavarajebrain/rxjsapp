import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpratorsComponent } from './operators/operators.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HigherOrderOperatorsComponent } from './higher-order-operators/higher-order-operators.component';

const routes: Routes = [
  { path: '', component:DashboardComponent,pathMatch:"full" },
  { path: 'operators', component:OpratorsComponent},
  {path :'higher-order-operators' , component:HigherOrderOperatorsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
