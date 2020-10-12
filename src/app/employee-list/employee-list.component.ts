import { Component, OnInit } from '@angular/core';
import {ApiService} from '../_service/api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employeeList: any = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.api.getAllData().subscribe(data => {
      this.employeeList = data;
      console.log(this.employeeList);
    });
  }

}
