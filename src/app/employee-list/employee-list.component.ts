import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../_service/api.service';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {EmployeeModalComponent} from './employee-modal/employee-modal.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  employeeList: any = [];
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
      this.employeeList = data.data;
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
      data: employee
    });
  }


}
