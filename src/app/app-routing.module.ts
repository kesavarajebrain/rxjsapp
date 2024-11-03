import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpratorsComponent } from './operators/operators.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component:DashboardComponent,pathMatch:"full" },
  { path: 'operators', component:OpratorsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
