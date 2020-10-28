import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Employee} from '../employee';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent implements OnInit {
  id: number;
  employee: Employee = {};


  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
  }

  ngOnInit(): void {
  }

}
