import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeCardComponent} from './employee-list/employee-card/employee-card.component';

const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    component: EmployeeListComponent
  },
  {
    path: ':id',
    component: EmployeeCardComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
