import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from 'angular-bootstrap-md';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ApiService} from '../../_service/api.service';
import {error} from '@angular/compiler/src/util';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent implements OnInit {
  employee: any;
  isNewEmployee = false;
  elForm: FormGroup;
  action: any = new Subject();

  constructor(public modalRf: MDBModalRef,
              private api: ApiService,
              // tslint:disable-next-line:variable-name
              private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getData();
    this.createEmployeeForm();
  }

  getData(): void {
    if (this.employee === undefined) {
      this.isNewEmployee = true;
      this.employee = {};
    } else {
      this.employee = Object.assign({}, this.employee);
    }
  }

  private createEmployeeForm() {
    this.elForm = this._formBuilder.group({
      name: new FormControl({ value: this.employee.employee_name, disabled: false }),
      age: new FormControl({ value: this.employee.employee_age, disabled: false }),
      salary: new FormControl({ value: this.employee.employee_salary, disabled: false })
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
      this.action.next(employee);
    }, error => console.log(error));
  }

  saveEmployee() {
    Object.assign(this.employee, this.elForm.value);
    console.log(this.employee.id);
    this.api.updateEmployee(this.employee.id, this.employee).subscribe(data => {
      this.action.next(this.employee);
    }, error => console.log(error));
  }
}
