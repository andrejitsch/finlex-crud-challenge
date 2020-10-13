import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../_service/api.service';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {EmployeeModalComponent} from './employee-modal/employee-modal.component';
import {Employee} from './employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  employeeList: Employee[] = [];
  previous: any = [];
  headElements = ['ID', 'Name', 'Age', 'Salary'];

  modalRf: MDBModalRef;

  constructor(private api: ApiService,
              private modalService: MDBModalService,
              private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.api.getAllData().subscribe(data => {
      this.employeeList = data.data.map((prop, index) => ({
        id: index,
        name: prop.employee_name,
        age: prop.employee_age,
        salary: prop.employee_salary
      }));
      console.log(this.employeeList);
      this.mdbTable.setDataSource(this.employeeList);
      this.employeeList = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
      console.log(this.employeeList);
    });
  }

  ngAfterViewInit(): void {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  deleteData(employeeID) {
    this.api.deleteData(employeeID).subscribe(response => {
      this.deleteEntryFromList(employeeID);
      console.log(this.mdbTable);
      console.log(this.employeeList);
    }, error => {
      console.log(error);
    });
  }

  deleteEntryFromList(employeeID) {
    const findingRow = this.employeeList.findIndex(obj => obj.id === employeeID);
    this.mdbTable.removeRow(findingRow);
  }




  openModal(employee?) {
    this.modalRf = this.modalService.show(EmployeeModalComponent, {
      data: {data: employee}
    });

    this.modalRf.content.action.subscribe((result: any) => {
      if (result) {
        switch (result.triggerdMethod) {
          case 'add':
            this.employeeList.unshift(result.data);
            break;

          case 'edit':
            this.editEntryInList(result.data);
        }
        this.mdbTable.setDataSource(this.employeeList);
      }
    });
  }

  editEntryInList(emloyee) {
    this.employeeList.forEach((item, index ) => {
      if (item.id === emloyee.id) {
        this.employeeList[index] = emloyee;
      }
    });
  }


}
