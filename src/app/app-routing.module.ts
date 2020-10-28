import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeCardComponent} from './employee-list/employee-card/employee-card.component';

const routes: Routes = [

  {
    path: '',
    component: EmployeeListComponent,
    children: [{
      path: ':id',
      component: EmployeeCardComponent
    }]
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
