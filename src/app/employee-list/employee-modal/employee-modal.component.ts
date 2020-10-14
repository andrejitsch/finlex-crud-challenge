import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from 'angular-bootstrap-md';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ApiService} from '../../_service/api.service';
import {error} from '@angular/compiler/src/util';
import {Subject} from 'rxjs';
import {Employee} from '../employee';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent implements OnInit {
  employee: Employee = {};
  data: any = {};
  isNewEmployee = false;
  elForm: FormGroup;
  action: any = new Subject();

  constructor(public modalRf: MDBModalRef,
              private api: ApiService,
              private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.data);
    this.getData();
    this.createEmployeeForm();
  }

  getData(): void {
    if (this.employee === undefined) {
      console.log(this.employee);
      this.isNewEmployee = true;
    } else {
      this.employee = Object.assign({}, this.data);
    }
  }

  private createEmployeeForm() {
    this.elForm = this._formBuilder.group({
      name: new FormControl({ value: this.employee.name, disabled: false }),
      age: new FormControl({ value: this.employee.age, disabled: false }),
      salary: new FormControl({ value: this.employee.salary, disabled: false })
    });
  }

  addEmployee() {
    Object.assign(this.employee, this.elForm.value);
    // Add employee api service call
    this.api.addData(this.employee).subscribe(data => {// success message
      // Clear form fields once the employee added successfully
      // tslint:disable-next-line:no-shadowed-variable
      console.log(data.data);
      const employee = {
        id: '' + data.data.id,
        employee_name: this.employee.name,
        employee_salary: this.employee.salary,
        employee_age: this.employee.age,
      };
      this.action.next({
        data: employee,
        triggerMethod: 'add'
      });
    }, error => console.log(error));
  }

  saveEmployee() {
    console.log(this.employee);
    Object.assign(this.employee, this.elForm.value);
    this.api.updateEmployee(this.employee.id, this.employee).subscribe(data => {
      console.log(this.employee);
      // this.action.next(this.employee);
    }, error => console.log(error));
  }
}
