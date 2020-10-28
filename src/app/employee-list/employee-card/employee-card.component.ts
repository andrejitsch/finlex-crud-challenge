import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Employee} from '../employee';
import {ApiService} from '../../_service/api.service';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent implements OnInit {
  id: number;
  employee: Employee = {};
  isLoading = true;


  constructor(private route: ActivatedRoute, private api: ApiService) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.api.getEmployeeByID(this.id).subscribe(employee => {
      this.employee.id = this.id;
      this.employee.salary = employee.data.employee_salary;
      this.employee.age = employee.data.employee_age;
      this.employee.name = employee.data.employee_name;
      this.isLoading = false;
    });
  }

}
