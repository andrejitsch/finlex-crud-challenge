import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from 'angular-bootstrap-md';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent implements OnInit {
  employee: any;
  isNewEmployee = false;
  elForm: FormGroup;

  constructor(public modalRf: MDBModalRef,
              // tslint:disable-next-line:variable-name
              private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getData();
    this.createEmployeeForm();
  }

  getData(): void {
    if (this.employee === undefined) {
      this.isNewEmployee = true;
    } else {
      this.employee = Object.assign({}, this.employee);
    }
  }

  private createEmployeeForm() {
    this.elForm = this._formBuilder.group({
      name: new FormControl({ value: this.employee.employee_name }),
      age: new FormControl({ value: this.employee.employee_age}),
      salary: new FormControl({ value: this.employee.employee_salary })
    });
  }

}
