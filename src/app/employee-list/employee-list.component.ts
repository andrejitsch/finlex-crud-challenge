import {AfterViewInit, ChangeDetectorRef, Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ApiService} from '../_service/api.service';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {EmployeeModalComponent} from './employee-modal/employee-modal.component';
import {Employee} from './employee';
import {ConfirmationModalComponent} from '../shared/confirmation-modal.component';
import {DataService} from '../_service/data.service';
import {ToastrService} from 'ngx-toastr';

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

  textSearch = '';
  modalRf: MDBModalRef;


  constructor(private api: ApiService,
              private modalService: MDBModalService,
              private cdRef: ChangeDetectorRef,
              private toastr: ToastrService,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.getData();
    this.dataService.currentText.subscribe(txt => {
      this.textSearch = txt;
      if (this.textSearch !== '') {
        this.searchItems();
      }
    });
  }

  getData(): void {
    this.api.getAllData().subscribe(data => {
      this.employeeList = data.data.map((prop, index) => ({
        id: prop.id,
        name: prop.employee_name,
        age: prop.employee_age,
        salary: prop.employee_salary
      }));
      console.log(this.employeeList);
      this.mdbTable.setDataSource(this.employeeList);
      this.employeeList = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    });
  }

  ngAfterViewInit(): void {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  deleteData(employee) {
    this.modalRf = this.modalService.show(ConfirmationModalComponent, {
      data: {data: employee}
    });

    this.modalRf.content.action.subscribe((result: any) => {
      if (result.data) {
        console.log(employee.id);
        this.api.deleteData(employee.id).subscribe(response => {
          this.deleteEntryFromList(employee.id);
          console.log(response);
          this.toastr.success(response.message);
        }, error => {
          this.toastr.error(error.message);
        });
      }
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
      console.log(result.triggerMethod);
      if (result) {
        if (result.triggerMethod === 'add') {
          console.log(result.data);
          this.employeeList.unshift(result.data);
        } else {
          console.log('Edit is triggering');
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
        console.log(this.employeeList[index]);
      }
      this.mdbTable.setDataSource(this.employeeList);
    });
  }


  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.textSearch) {
      this.mdbTable.setDataSource(this.previous);
      this.employeeList = this.mdbTable.getDataSource();
    }
    if (this.textSearch) {
      this.employeeList = this.mdbTable.searchLocalDataBy(this.textSearch);
      this.mdbTable.setDataSource(prev);
    }
  }
}
