import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from 'angular-bootstrap-md';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../_service/api.service';
import {error} from '@angular/compiler/src/util';
import {Subject} from 'rxjs';
import {Employee} from '../employee';
import {ToastrService} from 'ngx-toastr';

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
              private toastr: ToastrService,
              private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.data);
    this.getData();
    this.createEmployeeForm();
  }

  getData(): void {
    if (this.data === undefined) {
      this.isNewEmployee = true;
    } else {
      this.employee = Object.assign({}, this.data);
    }
  }

  private createEmployeeForm() {
    this.elForm = this._formBuilder.group({
      name: new FormControl({ value: this.employee.name, disabled: false }, Validators.required),
      age: new FormControl({ value: this.employee.age, disabled: false }, Validators.required),
      salary: new FormControl({ value: this.employee.salary, disabled: false }, Validators.required)
    });
  }

  addEmployee() {
    Object.assign(this.employee, this.elForm.value);
    // Add employee api service call
    this.api.addData(this.employee).subscribe(data => {// success message
      // Clear form fields once the employee added successfully
      this.employee.id = data.data.id;
      this.action.next({
        data: this.employee,
        triggerMethod: 'add'
      });
      this.toastr.success(data.message);
    }, error => {
      this.toastr.error(error.message);
    });
  }

  saveEmployee() {
    Object.assign(this.employee, this.elForm.value);
    this.api.updateEmployee(this.employee.id, this.employee).subscribe(data => {
      this.action.next({
          data: this.employee,
          triggerMethod: 'edit'
        });
      this.toastr.success(data.message);
    }, error => {
      this.toastr.error(error.message);
    });
  }
}
